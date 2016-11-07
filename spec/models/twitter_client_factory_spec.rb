require 'twitter'
require 'spec_helper'
require_relative '../../app/models/twitter_client_factory'

RSpec.describe TwitterClientFactory do
  describe '#call' do
    it 'builds a twitter client class with the passed config' do
      instance = TwitterClientFactory.new.call(
        'consumer_key' => 'ck',
        'consumer_secret' => 'cs',
        'access_token' => 'at',
        'access_token_secret' => 'ats'
      )

      expect(instance).to be_a Twitter::REST::Client
      expect(instance).to have_attributes(
        'consumer_key' => 'ck',
        'consumer_secret' => 'cs',
        'access_token' => 'at',
        'access_token_secret' => 'ats'
      )
    end
  end

  context 'when config is not passed' do
    before do
      @consumer_key_backup = ENV['TWITTER_CONSUMER_KEY']
      @consumer_secret_backup = ENV['TWITTER_CONSUMER_SECRET']
      @access_token_backup = ENV['TWITTER_ACCESS_TOKEN']
      @access_token_secret_backup = ENV['TWITTER_ACCESS_TOKEN_SECRET']

      ENV['TWITTER_CONSUMER_KEY'] = 'ck'
      ENV['TWITTER_CONSUMER_SECRET'] = 'cs'
      ENV['TWITTER_ACCESS_TOKEN'] = 'at'
      ENV['TWITTER_ACCESS_TOKEN_SECRET'] = 'ats'
    end

    after do
      ENV['TWITTER_CONSUMER_KEY'] = @consumer_key_backup
      ENV['TWITTER_CONSUMER_SECRET'] = @consumer_secret_backup
      ENV['TWITTER_ACCESS_TOKEN'] = @access_token_backup
      ENV['TWITTER_ACCESS_TOKEN_SECRET'] = @access_token_secret_backup
    end

    it 'picks config values from the environment' do
      instance = TwitterClientFactory.new.call

      expect(instance).to have_attributes(
        'consumer_key' => 'ck',
        'consumer_secret' => 'cs',
        'access_token' => 'at',
        'access_token_secret' => 'ats'
      )
    end
  end
end
