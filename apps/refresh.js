import plugin from '../../../lib/plugins/plugin.js';
import path from 'path';
import { execSync } from 'child_process'

const _path = process.cwd()

export class refresh extends plugin {
    constructor() {
        super({
            name: '[SponsorList]refresh',
            dsc: 'refresh',
            event: 'message',
            priority: 10,
            rule: [
                {
                    reg: '^#?(更新|刷新)(赞助|资助)名单$',
                    fnc: 'refresh'
                }
            ]
        })
    }
    async refresh() {
        if (!this.e.isMaster) { return true }
        const SponsorList = path.join(`${_path}/plugins`, `SponsorList`)
        await this.e.reply(`正在尝试更新赞助名单...`)
        const cmd = `git pull`
        const options = {
            cwd: SponsorList
        };
        execSync(cmd, options), function (error, stdout, stderr) {
            if (/(Already up[ -]to[ -]date|已经是最新的)/.test(stdout)) {
                this.e.reply('目前已经是最新的赞助名单了~')
                return true
            }
            if (error) {
                this.e.reply('赞助名单刷新失败！\nError code: ' + error.code + '\n' + error.stack + '\n 请稍后重试。')
                return true
            }
            this.e.reply(`赞助名单更新成功！`)
            return true
        }
    }
}