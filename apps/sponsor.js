const htmlDir = `../resources/markdown/`
const tplFile = `${htmlDir}markdown.html`

const _path = process.cwd()

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
          reg: "^#?(我要|我想)?(赞助|资助)$",
          fnc: "sponsorImage"
        }
      ]
    })
  }

  async sponsorList() {
    const mdFile = `${_path}/plugins/SponsorList/README.md`
    logger.debug(`[SponsorList] 查看：${logger.blue(msg)}`)
    if (!(fs.existsSync(mdFile) && fs.statSync(mdFile).isFile())) {
      await this.reply("无法查看，请检查是否存在README.md", true)
      return false
    }
    const Markdown = md.render(fs.readFileSync(mdFile, "utf-8"))
    const img = await puppeteer.screenshot("SponsorList", { tplFile, htmlDir, Markdown })
    await this.reply(img, true)
  }
  async sponsorImage() {
    await this.e.reply(segment.image(`${_path}/plugins/SponsorList/resources/image/sponsor.png`))
    return true
  }
}