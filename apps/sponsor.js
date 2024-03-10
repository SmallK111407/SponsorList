const _path = process.cwd().replace(/\\/g, '/')
const htmlDir = `${_path}/plugins/SponsorList/resources/html/markdown/`
const tplFile = `${htmlDir}markdown.html`

export class sponsor extends plugin {
  constructor() {
    super({
      name: "sponsor",
      dsc: "sponsor",
      event: "message",
      priority: 10,
      rule: [
        {
          reg: "^#?(查看|察看)?(全部|所有|总)?(赞助名单|赞助列表|赞助感谢名单|赞助感谢列表)(第)?(.*)?(页|张)?$",
          fnc: "sponsorList"
        },
        {
          reg: "^#?(我要|我想)?(赞助|资助|zz)(旧|旧版)?(英|英语)?$",
          fnc: "sponsorImage"
        }
      ]
    })
  }

  async sponsorList() {
    function chineseToNumber(chinese) {
      let numbers = {
        "零": 0,
        "一": 1,
        "二": 2,
        "三": 3,
        "四": 4,
        "五": 5
      }
      return numbers[chinese]
    }
    async function markdown(number) {
      const mdFile = `${_path}/plugins/SponsorList/resources/markdown/List_${number}.md`
      const Markdown = md.render(fs.readFileSync(mdFile, "utf-8"))
      const img = await puppeteer.screenshot("SponsorList", { tplFile, htmlDir, Markdown })
      await this.e.reply(img, true)
    }
    await this.e.reply(`赞助名单生成中...若长时间未发送可访问以下链接查看\nhttps://gitee.com/SmallK111407/SponsorList/blob/main/resources/markdown/Total.md\n若不是最新的名单可发送【#刷新赞助名单】`, true, { recallMsg: 30 })
    const result = this.e.msg.replace(/查看|察看|赞助名单|赞助列表|赞助感谢名单|赞助感谢列表|第|页|张/g, '')
    let number = chineseToNumber(String(result))
    if (number == undefined) return this.e.reply(`当前查看页不存在！`, true, {recallMsg: 60})
    if (result === "") {
      await markdown(`1`)
    } else if (result === "全部" || result === "所有" || result === "总") {
      const mdFile = `${_path}/plugins/SponsorList/resources/markdown/TotalList.md`
      const Markdown = md.render(fs.readFileSync(mdFile, "utf-8"))
      const img = await puppeteer.screenshot("SponsorList", { tplFile, htmlDir, Markdown })
      await this.e.reply(img, true)
    } else {
      await markdown(number)
    }
  }
  async sponsorImage() {
    if (this.e.msg.includes("英") || (this.e.msg.includes("英") && this.e.msg.includes("旧"))) {
      await this.e.reply(segment.image(`${_path}/plugins/SponsorList/resources/image/sponsor_old_en.png`), false, { recallMsg: 90 })
      return true
    } else if (this.e.msg.includes("旧")) {
      await this.e.reply(segment.image(`${_path}/plugins/SponsorList/resources/image/sponsor_old.png`), false, { recallMsg: 90 })
      return true
    } else {
      await this.e.reply(segment.image(`${_path}/plugins/SponsorList/resources/image/sponsor.png`), false, { recallMsg: 90 })
      return true
    }
  }
}