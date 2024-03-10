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
    const result = this.e.msg.replace(/#|查看|察看|赞助名单|赞助列表|赞助感谢名单|赞助感谢列表|第|页|张/g, ``)
    if (result === "") {
      await this.e.reply(`赞助名单生成中...若长时间未发送可访问以下链接查看\nhttps://gitee.com/SmallK111407/SponsorList/blob/main/resources/markdown/TotalList.md\n若不是最新的名单可发送【#刷新赞助名单】`, true, { recallMsg: 30 })
      const mdFile = `${_path}/plugins/SponsorList/resources/markdown/List_1.md`
      const Markdown = md.render(fs.readFileSync(mdFile, "utf-8"))
      const img = await puppeteer.screenshot("SponsorList", { tplFile, htmlDir, Markdown })
      await this.e.reply(img, true)
      return true
    } else if ((result === "全部" || result === "所有" || result === "总") && !([`1`, `2`, `3`, `4`, `5`].includes(result))) {
      await this.e.reply(`赞助名单生成中...若长时间未发送可访问以下链接查看\nhttps://gitee.com/SmallK111407/SponsorList/blob/main/resources/markdown/TotalList.md\n若不是最新的名单可发送【#刷新赞助名单】`, true, { recallMsg: 30 })
      const mdFile = `${_path}/plugins/SponsorList/resources/markdown/TotalList.md`
      const Markdown = md.render(fs.readFileSync(mdFile, "utf-8"))
      const img = await puppeteer.screenshot("SponsorList", { tplFile, htmlDir, Markdown })
      await this.e.reply(img, true)
      return true
    } else if (!(result === "全部" || result === "所有" || result === "总") && ([`1`, `2`, `3`, `4`, `5`].includes(result))) {
      await this.e.reply(`赞助名单生成中...若长时间未发送可访问以下链接查看\nhttps://gitee.com/SmallK111407/SponsorList/blob/main/resources/markdown/TotalList.md\n若不是最新的名单可发送【#刷新赞助名单】`, true, { recallMsg: 30 })
      const mdFile = `${_path}/plugins/SponsorList/resources/markdown/List_${result}.md`
      const Markdown = md.render(fs.readFileSync(mdFile, "utf-8"))
      const img = await puppeteer.screenshot("SponsorList", { tplFile, htmlDir, Markdown })
      await this.e.reply(img, true)
      return true
    } else {
      await this.e.reply(`传入了错误的数据~`, true, { recallMsg: 60 })
      return true
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