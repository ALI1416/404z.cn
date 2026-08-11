import {VercelRequest, VercelResponse} from '@vercel/node'
import {cacheControl, cacheControlMaxAge, contentType, contentTypeJson, contentTypePlain} from '../../../src/Constant'

// import * as fs from 'node:fs'

// https://github.com/Platane/snk/blob/main/packages/github-user-contribution/fetchContributionHtml.ts

/**
 * 获取用户贡献
 * @param userName 用户名
 * @param year 年(默认一年前)
 * @return {ContributionType} 贡献
 */
async function getContribution(userName: string, year: string): Promise<ContributionType> {
  let url: string = `https://github.com/users/${userName}/contributions`
  if (year === 'undefined') {
    url += `?from=${year}-01-01`
  }
  let res: string = await (await fetch(url)).text()
  // let res: string = fs.readFileSync('./reference/contributions.html').toString()
  return parse(res)
}

/**
 * 贡献类型
 */
type ContributionType = [
  ContributionDataAndTotalType,
  ContributionItemType[][]
];
/**
 * 贡献时间和总计类型(起始年、月、日、总贡献)
 */
type ContributionDataAndTotalType = [number, number, number, number];
/**
 * 贡献项类型(贡献级别、贡献)
 */
type ContributionItemType = [number, number];

/**
 * 解析
 * @param data 数据
 * @return {ContributionType} 贡献
 */
function parse(data: string): ContributionType {
  let array: Partial<ContributionType> = []
  // 起始年、月、日、总贡献
  let h2: string = data.split('<h2')[1].split('h2>')[0]
  let contributionAll: number = Number((new RegExp(/\s(\d+)\s/).exec(h2) as RegExpExecArray)[1])
  let dateYearReg: RegExpExecArray | null = new RegExp(/in (\d+)\s/).exec(h2)
  let dateYear: number = 0, dateMonth: number = 0, dateDay: number = 0
  // 查询指定年，起始年、月、日使用1月1日
  if (dateYearReg !== null) {
    dateYear = Number(dateYearReg[1])
    dateMonth = 1
    dateDay = 1
  }
  // 贡献级别、贡献
  let contributions: number[][][] = []
  for (let i: number = 0; i < 53; i++) {
    contributions.push([])
  }
  let tbody: string = data.split('<tbody')[1].split('</tbody')[0]
  let trs: string[] = tbody.split('<tr')
  // 1周7天
  for (let i: number = 0; i < 7; i++) {
    let tds: string[] = trs[i + 1].split('<td')
    // 1年53周
    for (let j: number = 0; j < 53; j++) {
      let td: string = tds[j + 2]
      // 查询上一年，起始年、月、日使用第一天
      if (dateYearReg === null && i === 0 && (j === 0 || j === 1)) {
        let dateReg: RegExpExecArray | null = new RegExp(/data-date="([^"]+)"/).exec(td)
        if (dateReg !== null) {
          let date: string = dateReg[1]
          dateYear = Number((new RegExp(/^(\d+)-/).exec(date) as RegExpExecArray)[1])
          dateMonth = Number((new RegExp(/-(\d+)-/).exec(date) as RegExpExecArray)[1])
          dateDay = Number((new RegExp(/-(\d+)$/).exec(date) as RegExpExecArray)[1])
        }
      }
      // 贡献级别、贡献
      let levelReg: RegExpExecArray | null = new RegExp(/data-level="([^"]+)"/).exec(td)
      if (levelReg !== null) {
        let level: number = Number(levelReg[1])
        let contributionReg: RegExpExecArray | null = new RegExp(/(\d+) contribution/).exec(td)
        let contribution: number
        if (contributionReg === null) {
          contribution = 0
        } else {
          contribution = Number(contributionReg[1])
        }
        contributions[j].push([level, contribution])
      }
    }
  }
  array.push([dateYear, dateMonth, dateDay, contributionAll], contributions as ContributionItemType[][])
  return array as ContributionType
}

export default async (request: VercelRequest, response: VercelResponse) => {
  const {userName, year} = request.query
  let userNameValue: string = userName as string
  let yearValue: string = year as string

  let status: number = 200
  let contentTypeValue: string = contentTypePlain
  let data: any
  try {
    // /api/github/contribution/ali1416
    data = await getContribution(userNameValue, yearValue)
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
