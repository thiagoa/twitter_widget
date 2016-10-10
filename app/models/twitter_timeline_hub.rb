class TwitterTimelineHub
  Result = Struct.new(:status, :tweets)

  def initialize(twitter_client)
    @twitter_client = twitter_client
  end

  def call(user, count: 20)
    tweets = @twitter_client.user_timeline(user, count: count)
    Result.new(:ok, tweets)
  end
end
