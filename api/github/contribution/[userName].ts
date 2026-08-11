import {VercelRequest, VercelResponse} from '@vercel/node'
import {cacheControl, cacheControlMaxAge, contentType, contentTypeJson, contentTypePlain} from '../../../src/Constant'

/**
 * 贡献类型
 */
type ContributionType = [
  ContributionInfoType,
  ContributionItemType[][]
]
/**
 * 贡献信息类型(起始年、月、日、总贡献)
 */
type ContributionInfoType = [number, number, number, number]
/**
 * 贡献项类型(贡献级别、贡献)
 */
type ContributionItemType = [number, number]

/**
 * GraphQL响应
 */
type GraphQLResponse = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: {
            contributionDays: GraphQLResponseData[]
          }[]
        }
      }
    }
  }
}

/**
 * GraphQL响应数据
 */
type GraphQLResponseData = {
  date: string
  contributionLevel: GraphQLResponseContributionLevel
  contributionCount: number
}

/**
 * GraphQL响应贡献级别
 */
type GraphQLResponseContributionLevel =
  'NONE'
  | 'FIRST_QUARTILE'
  | 'SECOND_QUARTILE'
  | 'THIRD_QUARTILE'
  | 'FOURTH_QUARTILE'

/**
 * 获取贡献级别
 * @param level 贡献级别
 * @return {number} 贡献级别
 */
function getContributionLevel(level: GraphQLResponseContributionLevel): number {
  switch (level) {
    case 'FIRST_QUARTILE':
      return 1
    case 'SECOND_QUARTILE':
      return 2
    case 'THIRD_QUARTILE':
      return 3
    case 'FOURTH_QUARTILE':
      return 4
    default:
      return 0
  }
}

/**
 * 获取用户贡献
 * @param userName 用户名
 * @param githubToken githubToken
 * @param year 年(默认一年前)
 * @return {ContributionType | []} 贡献
 */
async function getContribution(userName: string, githubToken: string, year?: string): Promise<ContributionType | []> {
  const query: string = /* GraphQL */ `query ($login: String!, $from: DateTime, $to: DateTime) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionLevel
            contributionCount
          }
        }
      }
    }
  }
}`
  const variables: {
    login: string,
    from?: string,
    to?: string
  } = {login: userName}
  if (year != undefined) {
    variables.from = year + '-01-01T00:00:00Z'
    variables.to = year + '-12-31T23:59:59Z'
  }
  const res: GraphQLResponse = await (await fetch('https://api.github.com/graphql', {
    headers: {
      Authorization: `bearer ${githubToken}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({variables, query}),
  })).json()
  return parse(res)
}

/**
 * 解析
 * @param json JSON数据
 * @return {ContributionType | []} 贡献
 */
function parse(json: GraphQLResponse): ContributionType | [] {
  if (json.data) {
    let array: any[] = []
    let data: {
      contributionDays: GraphQLResponseData[]
    }[] = json.data.user.contributionsCollection.contributionCalendar.weeks
    // 起始年、月、日
    let date: string[] = data[0].contributionDays[0].date.split('-')
    array[0] = [Number(date[0]), Number(date[1]), Number(date[2])]
    // 总贡献
    let count: number = 0
    // 贡献
    array[1] = []
    for (let d of data) {
      let a: number[][] = []
      for (let c of d.contributionDays) {
        let b: number[] = []
        b.push(getContributionLevel(c.contributionLevel))
        let d: number = Number(c.contributionCount)
        b.push(d)
        a.push(b)
        count += d
      }
      array[1].push(a)
    }
    array[0][3] = count
    return array as ContributionType
  } else {
    return []
  }
}

export default async (request: VercelRequest, response: VercelResponse) => {
  const githubToken: string = process.env.GH_TOKEN as string
  const {userName, year} = request.query
  let userNameValue: string = userName as string
  let yearValue: string = year as string
  let status: number = 200
  let contentTypeValue: string = contentTypePlain
  let data: any
  try {
    // /api/github/contribution/ali1416
    data = await getContribution(userNameValue, githubToken, yearValue)
    contentTypeValue = contentTypeJson
  } catch (e) {
    const error = e as Error
    console.error(error)
    status = 500
    data = error.toString()
  }
  response.status(status)
    .setHeader(contentType, contentTypeValue)
    .setHeader(cacheControl, cacheControlMaxAge)
    .send(data)
}
