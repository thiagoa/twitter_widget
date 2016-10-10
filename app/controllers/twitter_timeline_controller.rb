class TwitterTimelineController < ApplicationController
  def show
    twitter_timeline_hub = TwitterTimelineHub.new
    result = twitter_timeline_hub.call(params[:id])

    render json: { tweets: result.tweets, status: result.status }
  end
end
