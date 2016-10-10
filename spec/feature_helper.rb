require 'rails_helper'
require 'rake'

TwitterWidget::Application.load_tasks
Rake::Task['webpack:compile'].invoke
