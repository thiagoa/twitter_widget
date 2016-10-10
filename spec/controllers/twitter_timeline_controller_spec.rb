require 'rails_helper'

RSpec.describe TwitterTimelineController, type: :request do
  def stub_timeline(id:, returns:)
    instance = instance_double(TwitterTimelineHub)
    allow(instance).to receive(:call).with(id).once.and_return(returns)

    allow(TwitterTimelineHub).to receive(:new).once.and_return(instance)
  end

  def stub_result(**attrs)
    instance_double(TwitterTimelineHub::Result, **attrs)
  end

  it "delivers whatever timeline TwitterTimelineHub returns as JSON" do
    stub_timeline(
      id: 'joe',
      returns: stub_result(
        status: :ok,
        tweets: [
          'screen_name' => 'joe',
          'text' => 'Hi @bob, I am Joe!',
          'mentions' => ['bob'],
          'created_at' => Time.new(2016, 1, 1)
        ]
      )
    )

    get twitter_timeline_path(id: 'joe')

    expect(response).to have_http_status(:ok)
    expect(response.content_type).to eq 'application/json'
    expect(response.parsed_body).to match(
      'status' => 'ok',
      'tweets' => [
        'screen_name' => 'joe',
        'text' => 'Hi @bob, I am Joe!',
        'mentions' => ['bob'],
        'created_at' => Time.new(2016, 1, 1).as_json
      ]
    )
  end
end
