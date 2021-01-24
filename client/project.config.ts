export const PROJECT_CONFIG = {
  name: 'Project Name',
  url: 'url',
  author: 'seo author',
  handle: '@handle',
  seo: {
    title: 'Seo Base Title',
    desc: `Seo Default Desc`,
    image: 'Default meta image',
  },
};

export const ENV_VARIABLES = process.env.NODE === 'DEVELOPMENT' ? {} : {};
