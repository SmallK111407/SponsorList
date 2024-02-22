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
          reg: "^#?(查看|察看)?(赞助名单|赞助列表|赞助感谢名单|赞助感谢列表)$",
          fnc: "sponsorList"
        },
        {
          reg: "^#?(我要|我想)?(赞助|资助|zz)(英|英语)?$",
          fnc: "sponsorImage"
        }
      ]
    })
  }

  async sponsorList() {
    await this.e.reply(`赞助名单生成中...若长时间未发送可访问以下链接查看\nhttps://gitee.com/SmallK111407/SponsorList/blob/main/resources/readme/README.md\n若不是最新的名单可发送【#刷新赞助名单】`, true, { recallMsg: 30 })
    const mdFile = `${_path}/plugins/SponsorList/resources/readme/README.md`
    logger.debug(`[SponsorList] 查看：${logger.blue(mdFile)}`)
    if (!(fs.existsSync(mdFile) && fs.statSync(mdFile).isFile())) {
      await this.reply("无法查看，请检查是否存在README.md", true)
      return false
    }
    const Markdown = md.render(fs.readFileSync(mdFile, "utf-8"))
    const img = await puppeteer.screenshot("SponsorList", { tplFile, htmlDir, Markdown })
    await this.reply(img, true)
  }
  async sponsorImage() {
    if (this.e.msg.includes("英")) {
      await this.e.reply(segment.image(`${_path}/plugins/SponsorList/resources/image/sponsor_en.png`), false, { recallMsg: 90 })
      return true
    } else {
      await this.e.reply(segment.image(`${_path}/plugins/SponsorList/resources/image/sponsor.png`), false, { recallMsg: 90 })
      return true
    }
  }
}