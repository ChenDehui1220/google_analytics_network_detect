###Jenkins Disable CSP
System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")

###Jenkins Notice Slack
curl -X POST --data-urlencode "payload={\"channel\":\"scrum-team\",\"username\":\"MSG-Robot\",\"icon_emoji\":\":bear:\",\"attachments\":[{\"fallback\":\"Google Analytics Network Test Results\",\"pretext\":\"Google Analytics Network Test Results\",\"color\":\"#0000d0\",\"fields\":[{\"title\":\"Messages\",\"value\":\"http://jenkins.dev.hq.hiiir/job/EC-Mall-F2E-GA-Validate-Beta/Google_Analytics_Network_Test_Results/\",\"short\":false}]}]}" https://hooks.slack.com/services/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