export default {
  name: 'category',
  type: 'document',
  title: 'Thẻ',
  fields: [
    {
      name: 'name',
      title: 'Tên thẻ',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }
  ],
}
