export default {
  name: 'tour',
  type: 'document',
  title: 'Tour',
  fields: [
    {
      name: 'isHot',
      type: 'boolean',
      title: 'Tour nổi bật',
    },
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
      title: 'Mô tả tour',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Product Slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'price',
      title: 'Giá bán',
      type: 'number',
    },
    
    {
      name: 'service',
      title: 'Dịch vụ',
      type: 'text',
    },
    
    {
      name: "categories",
      title: "Thẻ",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    },
  ],
}
