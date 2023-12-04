// import * as fs from 'fs'

/**
 * 获取用户贡献
 * @param userName 用户名
 * @param year 年(默认一年前)
 * @return number[][]
 */
async function getContribution(userName: string, year: string): Promise<number[][]> {
  let url = `https://github.com/users/${userName}/contributions`
  if (typeof year !== 'undefined') {
    url += `?from=${year}-01-01`
  }
  let res = await (await fetch(url)).text()
  // let res = fs.readFileSync('./reference/contributions.html').toString()
  return parse(res)
}

/**
 * 解析
 * @param data 数据
 * @return number[][]
 */
function parse(data: string): number[][] {
  let array: number[][] = []
  // 起始年、月、日、总贡献
  let h2 = data.split('<h2')[1].split('h2>')[0]
  let contributionAll = Number(RegExp(/\s(\d+)\s/).exec(h2)[1])
  let dateYearReg = RegExp(/in (\d+)\s/).exec(h2)
  let dateYear: number, dateMonth: number, dateDay: number
  // 查询指定年，起始年、月、日使用1月1日
  if (dateYearReg !== null) {
    dateYear = Number(dateYearReg[1])
    dateMonth = 1
    dateDay = 1
  }
  // 贡献级别、贡献
  let contributions = []
  for (let i = 0; i < 53; i++) {
    contributions.push([])
  }
  let tbody = data.split('<tbody')[1].split('</tbody')[0]
  let trs = tbody.split('<tr')
  // 1周7天
  for (let i = 0; i < 7; i++) {
    let tds = trs[i + 1].split('<td')
    // 1年53周
    for (let j = 0; j < 53; j++) {
      let td = tds[j + 2]
      // 查询上一年，起始年、月、日使用第一天
      if (dateYearReg === null && i === 0 && (j === 0 || j === 1)) {
        let dateReg = RegExp(/data-date="([^"]+)"/).exec(td)
        if (dateReg !== null) {
          let date = dateReg[1]
          dateYear = Number(RegExp(/^(\d+)-/).exec(date)[1])
          dateMonth = Number(RegExp(/-(\d+)-/).exec(date)[1])
          dateDay = Number(RegExp(/-(\d+)$/).exec(date)[1])
        }
      }
      // 贡献级别、贡献
      let levelReg = RegExp(/data-level="([^"]+)"/).exec(td)
      if (levelReg !== null) {
        let level = Number(levelReg[1])
        let contributionReg = RegExp(/(\d+) contribution/).exec(td)
        let contribution
        if (contributionReg !== null) {
          contribution = Number(contributionReg[1])
        } else {
          contribution = 0
        }
        contributions[j].push([level, contribution])
      }
    }
  }
  array.push([dateYear, dateMonth, dateDay, contributionAll])
  array.push(contributions)
  return array
}

export default async (request, response) => {
  const {userName, year} = request.query
  let userNameValue = userName as string
  let yearValue = year as string
  try {
    // /api/github/contribution/ali1416
    response.status(200)
      .setHeader('Cache-Control', 'max-age=21600, s-maxage=43200, stale-while-revalidate=86400')
      .json(await getContribution(userNameValue, yearValue))
  } catch (e) {
    console.error(e)
    response.status(500).end(e.toString())
  }
}
