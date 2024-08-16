import {Phone2Region} from '@ali1416/phone2region'

const phone2Region = new Phone2Region()

async function parse(phone: string) {
  // if (!phone2Region.initialized()) {
  //   console.log(123)
  //   await phone2Region.initByUrl('https://www.404z.cn/files/phone2region/v2.0.0/data/phone2region.zdb')
  // }
  // return phone2Region.parse(phone)
}

export {parse}
