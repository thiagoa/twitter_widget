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
end
