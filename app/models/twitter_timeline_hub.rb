class TwitterTimelineHub
  Result = Struct.new(:status, :tweets)

  def initialize(twitter_client)
    @twitter_client = twitter_client
  end

  def call(user, count: 20)
    tweets = fetch_user_timeline(user, count: count)
    Result.new(:ok, tweets)
  rescue Twitter::Error::NotFound
    Result.new(:not_found, [])
  rescue Twitter::Error::Unauthorized => e
    raise if e.message =~ /Invalid or expired token/

    Result.new(:forbidden, [])
  end

  private

  def fetch_user_timeline(*args)
    @twitter_client.user_timeline(*args).map do |tweet|
      filter_tweet(tweet)
    end
  end

  def filter_tweet(tweet)
    { created_at: tweet.created_at,
      screen_name: tweet.user.screen_name,
      text: tweet.text,
      mentions: extract_mentions(tweet) }
  end

  def extract_mentions(tweet)
    tweet.user_mentions.map(&:screen_name)
  end
end
