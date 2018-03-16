import React from 'react';
import { PodcastEpisodeTemplate } from '../../templates/podcast-episode';

const PodcastEpisodePreview = ({ entry, widgetFor }) => (
  <PodcastEpisodeTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    title={entry.getIn(['data', 'title'])}
  />
);

export default PodcastEpisodePreview;
