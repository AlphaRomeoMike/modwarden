<p align="center">
  <img src="./ModWarden.svg" alt="ModWarden 标志" width="120" />
</p>

<h1 align="center">ModWarden</h1>

<p align="center">
  运行在 Cloudflare Workers 上、兼容 Bitwarden 的密码管理服务端。
</p>

<p align="center">
  <a href="https://workers.cloudflare.com/"><img src="https://img.shields.io/badge/Powered%20by-Cloudflare-F38020?logo=cloudflare&logoColor=white" alt="Powered by Cloudflare" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-LGPL--3.0-2ea44f" alt="License: LGPL-3.0" /></a>
  <a href="https://github.com/AlphaRomeoMike/modwarden/tags"><img src="https://img.shields.io/github/v/tag/AlphaRomeoMike/modwarden?label=release" alt="最新版本" /></a>
</p>

<p align="center">
  <a href="./README.md">English</a> |
  <a href="./RELEASE_NOTES.md">更新日志</a> |
  <a href="./CONTRIBUTING.md">参与贡献</a> |
  <a href="./SECURITY.md">安全政策</a>
</p>

> **免责声明**
> ModWarden 与 Bitwarden 官方无关。请不要向 Bitwarden 官方团队反馈 ModWarden 的问题。
> 请定期备份你的密码库。

---

## 功能对比

| 功能 | Bitwarden 免费版 | ModWarden | 说明 |
|---|---|---|---|
| 网页密码库 | ✅ | ✅ | 黑白网页密码库，键盘焦点清晰可见 |
| TOTP | ❌ | ✅ | 支持 `steam://` |
| **PWA / 离线** | ❌ | ✅ | **可安装，可离线使用** |
| **通行密钥登录** | ✅ | ✅ | **无密码登录** |
| API 密钥 | ✅ | ✅ | CLI 密钥，可创建和轮换 |
| 登录两步验证 | ✅ | ✅ | TOTP、YubiKey、通行密钥 |
| 两步验证恢复码 | ✅ | ✅ | 一次性关闭两步验证的恢复码 |
| 实时推送同步 | ✅ | ✅ | 所有设备同步 |
| 附件 / Send | ✅ | ✅ | Cloudflare KV 或 R2 |
| 导入 / 导出 | ✅ | ✅ | Bitwarden JSON / CSV / **ZIP** |
| **云备份中心** | ❌ | ✅ | **定时 WebDAV / S3 增量备份** |
| 设备管理 | ✅ | ✅ | **移除设备，信任控制** |
| 登录请求 | ✅ | ✅ | **跨设备批准登录 / 解锁** |
| **多用户** | ✅ | ✅ | 邀请码注册 |
| 域名规则 | ✅ | ✅ | 等效域名，全局排除 |
| 填充辅助 | ✅ | ✅ | `POST /fill-assist` |
| 组织 / 集合 / 角色 | ✅ | ❌ | 未实现 |
| SSO / SCIM / 目录 | ✅ | ❌ | 未实现 |

---

## 在 Bitwarden 客户端中使用

在 Bitwarden 移动端、桌面端或浏览器扩展的登录页面选择**自托管**，把你的 Worker 地址填为服务器 URL，例如 `https://modwarden.<你的子域名>.workers.dev`。

第一个注册的账户成为所有者。之后注册新账户需要在**管理面板**中生成邀请码。

---

## 部署

生产环境由 GitHub Actions（[`deploy.yml`](./.github/workflows/deploy.yml)）在推送 `v*` 标签时自动部署，使用 KV 存储模式（[`wrangler.kv.toml`](./wrangler.kv.toml)），因此不需要 R2 存储桶，也不需要绑定银行卡。

### 一次性设置

1. **Cloudflare：** 打开一次 **Workers & Pages**，让账户获得 `workers.dev` 子域名。
2. **数据库：** 创建一个 D1 数据库，并把它的 ID 填入 `wrangler.kv.toml`（`database_id`）。本仓库中的 ID 是 ModWarden 的生产数据库；派生仓库必须使用自己的数据库。
   ```bash
   npx wrangler d1 create modwarden-db-apac --location apac
   ```
3. **API 令牌：** 在 Cloudflare 中打开 **My Profile → API Tokens → Create Custom Token**，并只授权给你的账户：

   | 类型 | 权限 | 访问级别 |
   |---|---|---|
   | Account | Workers Scripts | Edit |
   | Account | Workers KV Storage | Edit |
   | Account | D1 | Edit |
   | Account | Account Settings | Read |
   | User | Memberships | Read |
   | User | User Details | Read |

4. **GitHub 密钥：** 把令牌保存到仓库的 `production` 环境中：
   ```bash
   gh secret set CLOUDFLARE_API_TOKEN --env production
   ```

### 发布新版本

1. 通过拉取请求把改动合并到 `main`。`main` 受保护，CI 必须通过。
2. 在发布用的拉取请求中，更新 `package.json`、`package-lock.json` 和 `shared/app-version.ts` 中的版本号，并在 [`RELEASE_NOTES.md`](./RELEASE_NOTES.md) 中添加一条记录。
3. 给合并后的提交打标签，并只推送这个标签：
   ```bash
   git tag -a v1.2.3 -m "ModWarden v1.2.3"
   git push origin refs/tags/v1.2.3
   ```

工作流会构建网页密码库、部署 Worker，并在首次部署时创建 `JWT_SECRET`。要重新部署已有版本，运行 `gh workflow run deploy.yml --ref v1.2.3`。

- 如果要隐藏网页密码库，在 **Workers 设置 → Variables and Secrets** 中添加名为 `HIDE_WEB_VAULT`、值为 `1` 的文本变量。启用后，服务端托管的前端页面和静态资源返回 `404 Not Found`，而 Bitwarden 客户端使用的登录、同步、附件、图标、通知等服务端接口仍可正常使用；已安装或已缓存的 PWA 可以继续使用本地前端。删除该变量（或改为 `1` 以外的值）即可恢复服务端托管的网页密码库。

> [!TIP]
> KV（本仓库默认）与 R2（[`wrangler.toml`](./wrangler.toml)，`npm run deploy`）对比：
>   | 存储 | 需要绑卡 | 单个附件 / Send 文件上限 | 免费额度 |
>   |---|---|---|---|
>   | KV | 否 | 25 MiB（Cloudflare 限制） | 1 GB |
>   | R2 | 是 | 100 MB（软限制，可调整） | 10 GB |

---

## 本地开发

```bash
npm install
npm run dev:kv     # 本地 D1 和 KV 的 Worker，地址 http://localhost:8787（需要在 .dev.vars 中设置 JWT_SECRET）
npm run dev:demo   # 使用演示数据、无需后端的网页密码库
npm test           # 翻译检查和全部测试
```

---

## 常见问题

- **删除部署后重新部署，为什么注册又需要邀请码？**
  删除或重新部署 Worker 不会删除它的数据。D1 数据库和 KV 命名空间中的用户、邀请码和设置仍然存在，所以新部署会继续要求邀请码。如果要完全重新开始，还需要删除对应的 **D1 数据库和 KV 命名空间**。

- **网站提示缺少 `JWT_SECRET`，为什么？**
  `JWT_SECRET` 必须作为 **Secret**（运行时变量）配置在 **Workers → Settings → Variables and Secrets** 中，而不是构建变量；Worker 在运行时读取不到构建变量。部署工作流会在首次部署时创建它；如果它被删除，下一次部署会创建新的值，所有人都需要重新登录。

---

## 许可证

[LGPL-3.0](./LICENSE)

## 致谢

- [Bitwarden](https://bitwarden.com/) - 原始设计和客户端
- [Vaultwarden](https://github.com/dani-garcia/vaultwarden) - 服务端实现参考
- [Cloudflare Workers](https://workers.cloudflare.com/) - 无服务器平台
