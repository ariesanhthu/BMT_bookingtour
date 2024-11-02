export default {
    name: 'hotel',
    type: 'document',
    title: 'Khách sạn',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Tên',
      },
      {
        name: 'images',
        type: 'array',
        title: 'Thêm hình ảnh',
        of: [{type: 'image'}],
      },
      {
        name: 'description',
        type: 'text',
        title: 'Mô tả khách sạn',
      },
      {
        name: 'price',
        title: 'Giá phòng',
        type: 'number',
      },
    ],
  }
  