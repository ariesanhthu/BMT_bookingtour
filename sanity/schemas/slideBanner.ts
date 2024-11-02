export default {
    name: 'banner',
    type: 'document',
    title: 'Trang chủ',
    fields: [
        {
            name: 'slogan',
            type: 'string',
            title: 'Một câu Slogan tạo nên thương hiệu Agency',
          },
        {
            name: 'subSlogan',
            type: 'string',
            title: 'Một đoạn ngắn mô tả về slogan',
          },
      {
        name: 'images',
        type: 'array',
        title: 'ảnh trình chiếu',
        of: [{type: 'image'}],
      },
    ],
  }
  