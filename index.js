import fs from 'node:fs'
import chalk from 'chalk'

if (!global.segment) {
  global.segment = (await import("oicq")).segment
}

let ret = []

logger.info(chalk.rgb(0, 150, 204)(`---------qwp---------`))
logger.info(chalk.rgb(0, 150, 204)(`[曉K]赞助名单载入成功~qwq`))
logger.info(chalk.rgb(0, 150, 204)(`This is a Sponsor List for 曉K's fans`))
logger.info(chalk.rgb(0, 150, 204)(`---------------------`));

const files = fs
  .readdirSync('./plugins/SponsorList/apps')
  .filter((file) => file.endsWith('.js'))

  files.forEach((file) => {
    ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')
  
  if (ret[i].status != 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
    }
    apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
export { apps }
