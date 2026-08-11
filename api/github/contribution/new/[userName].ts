import {VercelRequest, VercelResponse} from '@vercel/node'
import {
  cacheControl,
  cacheControlMaxAge,
  contentType,
  contentTypeJson,
  contentTypePlain,
} from '../../../../src/Constant'

// https://github.com/Platane/snk/blob/main/packages/github-user-contribution/index.ts

/**
 * 贡献类型
 */
type ContributionType = [
  ContributionInfoType,
  ContributionItemType[][]
];
/**
 * 贡献信息类型(起始年、月、日、总贡献)
 */
type ContributionInfoType = [number, number, number, number];
/**
 * 贡献项类型(贡献级别、贡献)
 */
type ContributionItemType = [number, number];

/**
 * GraphQL响应
 */
type GraphQLResponse = {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        weeks: {
          contributionDays: {
            contributionCount: number;
            contributionLevel:
              | 'FOURTH_QUARTILE'
              | 'THIRD_QUARTILE'
              | 'SECOND_QUARTILE'
              | 'FIRST_QUARTILE'
              | 'NONE';
            date: string;
            weekday: number;
          }[];
        }[];
      };
    };
  };
};

/**
 * 获取用户贡献
 * @param userName 用户名
 * @param githubToken githubToken
 * @param year 年(默认一年前)
 * @return {ContributionType} 贡献
 */
async function getContribution(userName: string, githubToken: string, year?: string): Promise<ContributionType> {
  const query: string = /* GraphQL */ `query ($login: String!, $from: DateTime, $to: DateTime) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        weeks {
          contributionDays {
            contributionCount
            contributionLevel
            weekday
            date
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
  const res = await fetch('https://api.github.com/graphql', {
    headers: {
      Authorization: `bearer ${githubToken}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({variables, query}),
  })
  return parse(res)
}

/**
 * 解析
 * @param data 数据
 * @return {ContributionType} 贡献
 */
function parse(data: string): ContributionType {
  return data
}

export default async (request: VercelRequest, response: VercelResponse) => {
  const githubToken: string | undefined = process.env.GH_TOKEN
  if (!githubToken) {
    throw new Error('Vercel环境变量 GH_TOKEN 未配置')
  }
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
