class TwitterTimelineHub
  Result = Struct.new(:status, :tweets)

  def initialize(twitter_client = TwitterClientFactory.new.call)
    @twitter_client = twitter_client
  end

  def call(user, count: 20)
    tweets = @twitter_client.user_timeline(user, count: count).map do |tweet|
      { created_at: tweet.created_at,
        screen_name: tweet.user.screen_name,
        text: tweet.text,
        mentions: tweet.user_mentions.map(&:screen_name) }
    end

    Result.new(:ok, tweets)
  end
end
