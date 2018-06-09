

const {mysql} = require('../qcloud')

module.exports = async (ctx)=> {
	const {page} = ctx.request.query
	const {size} = ctx.request.query
	const books = await mysql('books')
						.select('books.*', 'csessioninfo.user_info')
						.join('csessioninfo', 'books.openId', 'csessioninfo.open_id')
						.limit(size)
						.offset(Number(page)*size)
						.orderBy('id', 'desc')
	ctx.state.data = {
		list: books.map(v=> {
			const info = JSON.parse(v.user_info)
			return Object.assign({}, v, {
				user_info: {
					nickName: info.nickName
				}
			})
		})
	}
}