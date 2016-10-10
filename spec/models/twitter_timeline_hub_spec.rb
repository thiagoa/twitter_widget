require 'spec_helper'
require 'twitter'
require_relative '../../app/models/twitter_timeline_hub'

RSpec.describe TwitterTimelineHub do
  describe '#call' do
    it 'collaborates with twitter_client to get a timeline and delivers a result struct' do
      twitter_client = instance_double(Twitter::REST::Client)
      allow(twitter_client).to receive(:user_timeline).and_return([])
      twitter_hub = TwitterTimelineHub.new(twitter_client)

      result = twitter_hub.call('screen_name', count: 5)

      expect(result).to have_attributes(status: :ok, tweets: [])
      expect(twitter_client).to have_received(:user_timeline)
        .with('screen_name', count: 5)
        .once
    end
  end

  def build_tweet_double(user_name:, mention_name:, text:, created_at:)
    user = instance_double(Twitter::User, screen_name: user_name)
    mention = instance_double(
      Twitter::Entity::UserMention,
      screen_name: mention_name
    )
    instance_double(
      Twitter::Tweet,
      user: user,
      text: text,
      user_mentions: [mention],
      created_at: created_at
    )
  end

  context 'when the timeline is found' do
    it 'returns a result object with tweets and an ok status' do
      twitter_client = instance_double(Twitter::REST::Client)
      tweet = build_tweet_double(
        user_name: 'thiagoaraujos',
        text: 'Foo @bar',
        mention_name: 'bar',
        created_at: Date.new(2016, 1, 1)
      )
      allow(twitter_client).to receive(:user_timeline).and_return([tweet])
      twitter_timeline_hub = TwitterTimelineHub.new(twitter_client)

      result = twitter_timeline_hub.call('foo')

      expect(result.status).to eq :ok
      expect(result.tweets).to eq(
        [
          screen_name: 'thiagoaraujos',
          text: 'Foo @bar',
          mentions: ['bar'],
          created_at: Date.new(2016, 1, 1)
        ]
      )
    end
  end

  context 'when the timeline is not found' do
    it 'returns a result with no tweets and not_found status' do
      twitter_client = instance_double(Twitter::REST::Client)
      allow(twitter_client).to receive(:user_timeline)
        .with('screen_name', count: 5)
        .once { fail Twitter::Error::NotFound }

      twitter_hub = TwitterTimelineHub.new(twitter_client)
      result = twitter_hub.call('screen_name', count: 5)

      expect(result.status).to eq :not_found
      expect(result.tweets).to be_empty
    end
  end

  context 'when the timeline is forbidden' do
    it 'returns a result with no tweets and forbidden status' do
      twitter_client = double('twitter_client')
      allow(twitter_client).to receive(:user_timeline)
        .with('screen_name', count: 5)
        .once { fail Twitter::Error::Unauthorized }

      twitter_timeline_hub = TwitterTimelineHub.new(twitter_client)
      result = twitter_timeline_hub.call('screen_name', count: 5)

      expect(result.status).to eq :forbidden
      expect(result.tweets).to be_empty
    end
  end
end
