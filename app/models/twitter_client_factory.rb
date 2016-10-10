class TwitterClientFactory
  def call(params = {})
    params = default_params.merge(params)

    Twitter::REST::Client.new do |config|
      config.consumer_key = params['consumer_key']
      config.consumer_secret = params['consumer_secret']
      config.access_token = params['access_token']
      config.access_token_secret = params['access_token_secret']
    end
  end

  def default_params
    {
      'consumer_key' => ENV['TWITTER_CONSUMER_KEY'],
      'consumer_secret' => ENV['TWITTER_CONSUMER_SECRET'],
      'access_token' => ENV['TWITTER_ACCESS_TOKEN'],
      'access_token_secret' => ENV['TWITTER_ACCESS_TOKEN_SECRET']
    }
  end
end
