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
          reg: "^#?(我要|我想)?(赞助|资助|zz)$",
          fnc: "sponsorImage"
        }
      ]
    })
  }

  async sponsorList() {
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
    await this.e.reply(segment.image(`${_path}/plugins/SponsorList/resources/image/sponsor.png`))
    return true
  }
}