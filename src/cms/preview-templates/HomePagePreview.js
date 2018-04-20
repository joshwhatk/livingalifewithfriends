import React from 'react';
import { HomePageTemplate } from '../../templates/home-page';

const HomePagePreview = ({ entry, widgetFor }) => {
  const entryBlurbs = entry.getIn(['data', 'intro']);
  const intro = entryBlurbs ? entryBlurbs.toJS() : [];

  return (
    <HomePageTemplate
      title={entry.getIn(['data', 'title'])}
      intro={{ intro }}
      content={widgetFor('body')} />
  );
};

export default HomePagePreview;
