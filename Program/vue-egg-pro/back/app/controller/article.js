const BaseController = require('./base');
const marked = require('marked');
class ArticleController extends BaseController {
  async create() {
    const { ctx } = this;
    const { userid } = ctx.state;
    const { content } = ctx.request.body;

    const title = content.split('\n').find(v => {
      return v.indexOf('# ') === 0;
    });

    const obj = {
      title: title.replace('# ', ''),
      article: content, // 内部编辑的时候看的
      article_html: marked(content), // 给外部显示看的
      author: userid,
    };
    const ret = await ctx.model.Article.create(obj);
    if (ret._id) {
      this.success({
        id: ret.id,
        title: ret.title,
      });
    } else {
      this.error('创建失败');
    }
  }
}

module.exports = ArticleController;
