module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  // 链表查询
  const CommentSchema = new Schema(
    {
      __v: { type: Number, select: false },
      content: { type: String, required: true }, // 标题
      // views: { type: Number, required: false, default: 1 },
      // 作者
      author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: true,
      },
      isLiked: { type: Number, required: false, default: 0 },
      disLike: { type: Number, required: false, default: 0 },
    },
    { timestamps: true }
  );

  return mongoose.model('Comment', CommentSchema);
};
