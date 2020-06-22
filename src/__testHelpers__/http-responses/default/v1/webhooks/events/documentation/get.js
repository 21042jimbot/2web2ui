/* eslint-disable max-lines */
export default () => ({
  results: {
    message_event: {
      events: {
        bounce: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'bounce',
            },
            bounce_class: {
              description:
                'Classification code for a given message (see [Bounce Classification Codes](https://support.sparkpost.com/customer/portal/articles/1929896))',
              sampleValue: '1',
            },
            campaign_id: {
              description: 'Campaign of which this message was a part',
              sampleValue: 'Example Campaign Name',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            delv_method: {
              description: 'Protocol by which SparkPost delivered this message',
              sampleValue: 'esmtp',
            },
            device_token: {
              description:
                'Token of the device / application targeted by this PUSH notification message. Applies only when delv_method is gcm or apn.',
              sampleValue: '45c19189783f867973f6e6a5cca60061ffe4fa77c547150563a1192fa9847f8a',
            },
            error_code: {
              description:
                'Error code by which the remote server described a failed delivery attempt',
              sampleValue: '554',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            friendly_from: {
              description: 'Friendly sender or "From" header in the original email',
              sampleValue: 'sender@example.com',
            },
            injection_time: {
              description: 'Time at which this message was injected into SparkPost',
              sampleValue: '2016-04-18T14:25:07.000Z',
            },
            ip_address: {
              description:
                'IP address of the host to which SparkPost delivered this message; in engagement events, the IP address of the host where the HTTP request originated',
              sampleValue: '127.0.0.1',
            },
            ip_pool: {
              description: 'IP pool through which this message was sent',
              sampleValue: 'Example-Ip-Pool',
            },
            message_id: {
              description: 'SparkPost-cluster-wide unique identifier for this message',
              sampleValue: '000443ee14578172be22',
            },
            msg_from: {
              description: "Sender address used on this message's SMTP envelope",
              sampleValue: 'sender@example.com',
            },
            msg_size: {
              description: "Message's size in bytes",
              sampleValue: '1337',
            },
            num_retries: {
              description:
                'Number of failed attempts before this message was successfully delivered; when the first attempt succeeds, zero',
              sampleValue: '2',
            },
            rcpt_meta: {
              description: 'Metadata describing the message recipient',
              sampleValue: {
                customKey: 'customValue',
              },
            },
            rcpt_tags: {
              description: 'Tags applied to the message which generated this event',
              sampleValue: ['male', 'US'],
            },
            rcpt_to: {
              description:
                "Lowercase version of recipient address used on this message's SMTP envelope",
              sampleValue: 'recipient@example.com',
            },
            raw_rcpt_to: {
              description: "Actual recipient address used on this message's SMTP envelope",
              sampleValue: 'Recipient@example.com',
            },
            rcpt_type: {
              description:
                'Indicates that a recipient address appeared in the Cc or Bcc header or the archive JSON array',
              sampleValue: 'cc',
            },
            raw_reason: {
              description:
                'Unmodified, exact response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (17.99.99.99) is in block list',
            },
            reason: {
              description:
                'Canonicalized text of the response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (a.b.c.d) is in block list',
            },
            recv_method: {
              description: 'Protocol by which SparkPost received this message',
              sampleValue: 'esmtp',
            },
            routing_domain: {
              description: 'Domain receiving this message',
              sampleValue: 'example.com',
            },
            sending_ip: {
              description: 'IP address through which this message was sent',
              sampleValue: '127.0.0.1',
            },
            sms_coding: {
              description: 'Data encoding used in the SMS message',
              sampleValue: 'ASCII',
            },
            sms_dst: {
              description: 'SMS destination address',
              sampleValue: '7876712656',
            },
            sms_dst_npi: {
              description: 'Destination numbering plan identification',
              sampleValue: 'E164',
            },
            sms_dst_ton: {
              description: 'Type of number for the destination address',
              sampleValue: 'International',
            },
            sms_src: {
              description: 'SMS source address',
              sampleValue: '1234',
            },
            sms_src_npi: {
              description: 'Source numbering plan identification',
              sampleValue: 'E164',
            },
            sms_src_ton: {
              description: 'Type of number for the source address',
              sampleValue: 'Unknown',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            subject: {
              description: 'Subject line from the email header',
              sampleValue: 'Summer deals are here!',
            },
            template_id: {
              description: 'Slug of the template used to construct this message',
              sampleValue: 'templ-1234',
            },
            template_version: {
              description: 'Version of the template used to construct this message',
              sampleValue: '1',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            transmission_id: {
              description: 'Transmission which originated this message',
              sampleValue: '65832150921904138',
            },
          },
          description: 'Remote MTA has permanently rejected a message.',
          display_name: 'Bounce',
        },
        delivery: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'delivery',
            },
            campaign_id: {
              description: 'Campaign of which this message was a part',
              sampleValue: 'Example Campaign Name',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            delv_method: {
              description: 'Protocol by which SparkPost delivered this message',
              sampleValue: 'esmtp',
            },
            device_token: {
              description:
                'Token of the device / application targeted by this PUSH notification message. Applies only when delv_method is gcm or apn.',
              sampleValue: '45c19189783f867973f6e6a5cca60061ffe4fa77c547150563a1192fa9847f8a',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            friendly_from: {
              description: 'Friendly sender or "From" header in the original email',
              sampleValue: 'sender@example.com',
            },
            injection_time: {
              description: 'Time at which this message was injected into SparkPost',
              sampleValue: '2016-04-18T14:25:07.000Z',
            },
            ip_address: {
              description:
                'IP address of the host to which SparkPost delivered this message; in engagement events, the IP address of the host where the HTTP request originated',
              sampleValue: '127.0.0.1',
            },
            ip_pool: {
              description: 'IP pool through which this message was sent',
              sampleValue: 'Example-Ip-Pool',
            },
            message_id: {
              description: 'SparkPost-cluster-wide unique identifier for this message',
              sampleValue: '000443ee14578172be22',
            },
            msg_from: {
              description: "Sender address used on this message's SMTP envelope",
              sampleValue: 'sender@example.com',
            },
            msg_size: {
              description: "Message's size in bytes",
              sampleValue: '1337',
            },
            num_retries: {
              description:
                'Number of failed attempts before this message was successfully delivered; when the first attempt succeeds, zero',
              sampleValue: '2',
            },
            queue_time: {
              description:
                "Delay, expressed in milliseconds, between this message's injection into SparkPost and its delivery to the receiving domain; that is, the length of time this message spent in the outgoing queue",
              sampleValue: '12',
            },
            rcpt_meta: {
              description: 'Metadata describing the message recipient',
              sampleValue: {
                customKey: 'customValue',
              },
            },
            rcpt_tags: {
              description: 'Tags applied to the message which generated this event',
              sampleValue: ['male', 'US'],
            },
            rcpt_to: {
              description:
                "Lowercase version of recipient address used on this message's SMTP envelope",
              sampleValue: 'recipient@example.com',
            },
            raw_rcpt_to: {
              description: "Actual recipient address used on this message's SMTP envelope",
              sampleValue: 'Recipient@example.com',
            },
            rcpt_type: {
              description:
                'Indicates that a recipient address appeared in the Cc or Bcc header or the archive JSON array',
              sampleValue: 'cc',
            },
            recv_method: {
              description: 'Protocol by which SparkPost received this message',
              sampleValue: 'esmtp',
            },
            routing_domain: {
              description: 'Domain receiving this message',
              sampleValue: 'example.com',
            },
            sending_ip: {
              description: 'IP address through which this message was sent',
              sampleValue: '127.0.0.1',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            subject: {
              description: 'Subject line from the email header',
              sampleValue: 'Summer deals are here!',
            },
            sms_coding: {
              description: 'Data encoding used in the SMS message',
              sampleValue: 'ASCII',
            },
            sms_dst: {
              description: 'SMS destination address',
              sampleValue: '7876712656',
            },
            sms_dst_npi: {
              description: 'Destination numbering plan identification',
              sampleValue: 'E164',
            },
            sms_dst_ton: {
              description: 'Type of number for the destination address',
              sampleValue: 'International',
            },
            sms_remoteids: {
              description: 'The message ID(s) in the response, assigned by the remote server/SMSC',
              sampleValue: ['0000', '0001', '0002', '0003', '0004'],
            },
            sms_segments: {
              description:
                'Segment number of the log line for large messages sent through multiple SMSes',
              sampleValue: 5,
            },
            sms_src: {
              description: 'SMS source address',
              sampleValue: '1234',
            },
            sms_src_npi: {
              description: 'Source numbering plan identification',
              sampleValue: 'E164',
            },
            sms_src_ton: {
              description: 'Type of number for the source address',
              sampleValue: 'Unknown',
            },
            template_id: {
              description: 'Slug of the template used to construct this message',
              sampleValue: 'templ-1234',
            },
            template_version: {
              description: 'Version of the template used to construct this message',
              sampleValue: '1',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            transmission_id: {
              description: 'Transmission which originated this message',
              sampleValue: '65832150921904138',
            },
          },
          description: 'Remote MTA acknowledged receipt of a message.',
          display_name: 'Delivery',
        },
        injection: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'injection',
            },
            campaign_id: {
              description: 'Campaign of which this message was a part',
              sampleValue: 'Example Campaign Name',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            friendly_from: {
              description: 'Friendly sender or "From" header in the original email',
              sampleValue: 'sender@example.com',
            },
            injection_time: {
              description: 'Time at which this message was injected into SparkPost',
              sampleValue: '2016-04-18T14:25:07.000Z',
            },
            ip_pool: {
              description: 'IP pool through which this message was sent',
              sampleValue: 'Example-Ip-Pool',
            },
            message_id: {
              description: 'SparkPost-cluster-wide unique identifier for this message',
              sampleValue: '000443ee14578172be22',
            },
            msg_from: {
              description: "Sender address used on this message's SMTP envelope",
              sampleValue: 'sender@example.com',
            },
            msg_size: {
              description: "Message's size in bytes",
              sampleValue: '1337',
            },
            rcpt_meta: {
              description: 'Metadata describing the message recipient',
              sampleValue: {
                customKey: 'customValue',
              },
            },
            rcpt_tags: {
              description: 'Tags applied to the message which generated this event',
              sampleValue: ['male', 'US'],
            },
            rcpt_to: {
              description:
                "Lowercase version of recipient address used on this message's SMTP envelope",
              sampleValue: 'recipient@example.com',
            },
            raw_rcpt_to: {
              description: "Actual recipient address used on this message's SMTP envelope",
              sampleValue: 'Recipient@example.com',
            },
            rcpt_type: {
              description:
                'Indicates that a recipient address appeared in the Cc or Bcc header or the archive JSON array',
              sampleValue: 'cc',
            },
            recv_method: {
              description: 'Protocol by which SparkPost received this message',
              sampleValue: 'esmtp',
            },
            routing_domain: {
              description: 'Domain receiving this message',
              sampleValue: 'example.com',
            },
            sending_ip: {
              description: 'IP address through which this message was sent',
              sampleValue: '127.0.0.1',
            },
            sms_coding: {
              description: 'Data encoding used in the SMS message',
              sampleValue: 'ASCII',
            },
            sms_dst: {
              description: 'SMS destination address',
              sampleValue: '7876712656',
            },
            sms_dst_npi: {
              description: 'Destination numbering plan identification',
              sampleValue: 'E164',
            },
            sms_dst_ton: {
              description: 'Type of number for the destination address',
              sampleValue: 'International',
            },
            sms_segments: {
              description:
                'Segment number of the log line for large messages sent through multiple SMSes',
              sampleValue: 5,
            },
            sms_src: {
              description: 'SMS source address',
              sampleValue: '1234',
            },
            sms_src_npi: {
              description: 'Source numbering plan identification',
              sampleValue: 'E164',
            },
            sms_src_ton: {
              description: 'Type of number for the source address',
              sampleValue: 'Unknown',
            },
            sms_text: {
              description: 'The SMS message payload (in the character set specified in sms_coding)',
              sampleValue: 'lol',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            subject: {
              description: 'Subject line from the email header',
              sampleValue: 'Summer deals are here!',
            },
            template_id: {
              description: 'Slug of the template used to construct this message',
              sampleValue: 'templ-1234',
            },
            template_version: {
              description: 'Version of the template used to construct this message',
              sampleValue: '1',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            transmission_id: {
              description: 'Transmission which originated this message',
              sampleValue: '65832150921904138',
            },
          },
          description: 'Message is received by or injected into SparkPost.',
          display_name: 'Injection',
        },
        sms_status: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'sms_status',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            delv_method: {
              description: 'Protocol by which SparkPost delivered this message',
              sampleValue: 'esmtp',
            },
            dr_latency: {
              description:
                'Delivery report latency; interval between message submission and receipt',
              sampleValue: '0.02',
            },
            ip_address: {
              description:
                'IP address of the host to which SparkPost delivered this message; in engagement events, the IP address of the host where the HTTP request originated',
              sampleValue: '127.0.0.1',
            },
            ip_pool: {
              description: 'IP pool through which this message was sent',
              sampleValue: 'Example-Ip-Pool',
            },
            reason: {
              description:
                'Canonicalized text of the response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (a.b.c.d) is in block list',
            },
            routing_domain: {
              description: 'Domain receiving this message',
              sampleValue: 'example.com',
            },
            recv_method: {
              description: 'Protocol by which SparkPost received this message',
              sampleValue: 'esmtp',
            },
            raw_reason: {
              description:
                'Unmodified, exact response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (17.99.99.99) is in block list',
            },
            sending_ip: {
              description: 'IP address through which this message was sent',
              sampleValue: '127.0.0.1',
            },
            sms_dst: {
              description: 'SMS destination address',
              sampleValue: '7876712656',
            },
            sms_dst_npi: {
              description: 'Destination numbering plan identification',
              sampleValue: 'E164',
            },
            sms_dst_ton: {
              description: 'Type of number for the destination address',
              sampleValue: 'International',
            },
            sms_remoteids: {
              description: 'The message ID(s) in the response, assigned by the remote server/SMSC',
              sampleValue: ['0000', '0001', '0002', '0003', '0004'],
            },
            sms_src: {
              description: 'SMS source address',
              sampleValue: '1234',
            },
            sms_src_npi: {
              description: 'Source numbering plan identification',
              sampleValue: 'E164',
            },
            sms_src_ton: {
              description: 'Type of number for the source address',
              sampleValue: 'Unknown',
            },
            sms_text: {
              description: 'The SMS message payload (in the character set specified in sms_coding)',
              sampleValue: 'lol',
            },
            stat_type: {
              description: 'Status type in an SMS status event',
              sampleValue: 'SMSC Delivery',
            },
            stat_state: {
              description: 'Status value in an SMS status event',
              sampleValue: 'Delivered',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
          },
          description: 'SMPP/SMS message produced a status log output',
          display_name: 'SMS Status',
        },
        spam_complaint: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'spam_complaint',
            },
            campaign_id: {
              description: 'Campaign of which this message was a part',
              sampleValue: 'Example Campaign Name',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            delv_method: {
              description: 'Protocol by which SparkPost delivered this message',
              sampleValue: 'esmtp',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            fbtype: {
              description:
                'Type of spam report entered against this message (see [RFC 5965 § 7.3](http://tools.ietf.org/html/rfc5965#section-7.3))',
              sampleValue: 'abuse',
            },
            friendly_from: {
              description: 'Friendly sender or "From" header in the original email',
              sampleValue: 'sender@example.com',
            },
            injection_time: {
              description: 'Time at which this message was injected into SparkPost',
              sampleValue: '2016-04-18T14:25:07.000Z',
            },
            ip_address: {
              description:
                'IP address of the host to which SparkPost delivered this message; in engagement events, the IP address of the host where the HTTP request originated',
              sampleValue: '127.0.0.1',
            },
            ip_pool: {
              description: 'IP pool through which this message was sent',
              sampleValue: 'Example-Ip-Pool',
            },
            message_id: {
              description: 'SparkPost-cluster-wide unique identifier for this message',
              sampleValue: '000443ee14578172be22',
            },
            msg_from: {
              description: "Sender address used on this message's SMTP envelope",
              sampleValue: 'sender@example.com',
            },
            msg_size: {
              description: "Message's size in bytes",
              sampleValue: '1337',
            },
            num_retries: {
              description:
                'Number of failed attempts before this message was successfully delivered; when the first attempt succeeds, zero',
              sampleValue: '2',
            },
            queue_time: {
              description:
                "Delay, expressed in milliseconds, between this message's injection into SparkPost and its delivery to the receiving domain; that is, the length of time this message spent in the outgoing queue",
              sampleValue: '12',
            },
            rcpt_meta: {
              description: 'Metadata describing the message recipient',
              sampleValue: {
                customKey: 'customValue',
              },
            },
            rcpt_tags: {
              description: 'Tags applied to the message which generated this event',
              sampleValue: ['male', 'US'],
            },
            rcpt_to: {
              description:
                "Lowercase version of recipient address used on this message's SMTP envelope",
              sampleValue: 'recipient@example.com',
            },
            raw_rcpt_to: {
              description: "Actual recipient address used on this message's SMTP envelope",
              sampleValue: 'Recipient@example.com',
            },
            rcpt_type: {
              description:
                'Indicates that a recipient address appeared in the Cc or Bcc header or the archive JSON array',
              sampleValue: 'cc',
            },
            report_by: {
              description: 'Address of the entity reporting this message as spam',
              sampleValue: 'server.email.com',
            },
            report_to: {
              description: 'Address to which this spam report is to be delivered',
              sampleValue: 'abuse.example.com',
            },
            routing_domain: {
              description: 'Domain receiving this message',
              sampleValue: 'example.com',
            },
            sending_ip: {
              description: 'IP address through which this message was sent',
              sampleValue: '127.0.0.1',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            subject: {
              description: 'Subject line from the email header',
              sampleValue: 'Summer deals are here!',
            },
            template_id: {
              description: 'Slug of the template used to construct this message',
              sampleValue: 'templ-1234',
            },
            template_version: {
              description: 'Version of the template used to construct this message',
              sampleValue: '1',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            transmission_id: {
              description: 'Transmission which originated this message',
              sampleValue: '65832150921904138',
            },
            user_str: {
              description:
                'If configured, additional message log information, in user-defined format',
              sampleValue: 'Additional Example Information',
            },
          },
          description: 'Message was classified as spam by the recipient.',
          display_name: 'Spam Complaint',
        },
        out_of_band: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'out_of_band',
            },
            bounce_class: {
              description:
                'Classification code for a given message (see [Bounce Classification Codes](https://support.sparkpost.com/customer/portal/articles/1929896))',
              sampleValue: '1',
            },
            campaign_id: {
              description: 'Campaign of which this message was a part',
              sampleValue: 'Example Campaign Name',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            delv_method: {
              description: 'Protocol by which SparkPost delivered this message',
              sampleValue: 'esmtp',
            },
            device_token: {
              description:
                'Token of the device / application targeted by this PUSH notification message. Applies only when delv_method is gcm or apn.',
              sampleValue: '45c19189783f867973f6e6a5cca60061ffe4fa77c547150563a1192fa9847f8a',
            },
            error_code: {
              description:
                'Error code by which the remote server described a failed delivery attempt',
              sampleValue: '554',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            friendly_from: {
              description: 'Friendly sender or "From" header in the original email',
              sampleValue: 'sender@example.com',
            },
            injection_time: {
              description: 'Time at which this message was injected into SparkPost',
              sampleValue: '2016-04-18T14:25:07.000Z',
            },
            ip_address: {
              description:
                'IP address of the host to which SparkPost delivered this message; in engagement events, the IP address of the host where the HTTP request originated',
              sampleValue: '127.0.0.1',
            },
            ip_pool: {
              description: 'IP pool through which this message was sent',
              sampleValue: 'Example-Ip-Pool',
            },
            message_id: {
              description: 'SparkPost-cluster-wide unique identifier for this message',
              sampleValue: '000443ee14578172be22',
            },
            msg_from: {
              description: "Sender address used on this message's SMTP envelope",
              sampleValue: 'sender@example.com',
            },
            msg_size: {
              description: "Message's size in bytes",
              sampleValue: '1337',
            },
            num_retries: {
              description:
                'Number of failed attempts before this message was successfully delivered; when the first attempt succeeds, zero',
              sampleValue: '2',
            },
            queue_time: {
              description:
                "Delay, expressed in milliseconds, between this message's injection into SparkPost and its delivery to the receiving domain; that is, the length of time this message spent in the outgoing queue",
              sampleValue: '12',
            },
            raw_rcpt_to: {
              description: "Actual recipient address used on this message's SMTP envelope",
              sampleValue: 'Recipient@example.com',
            },
            raw_reason: {
              description:
                'Unmodified, exact response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (17.99.99.99) is in block list',
            },
            rcpt_meta: {
              description: 'Metadata describing the message recipient',
              sampleValue: {
                customKey: 'customValue',
              },
            },
            rcpt_tags: {
              description: 'Tags applied to the message which generated this event',
              sampleValue: ['male', 'US'],
            },
            rcpt_to: {
              description:
                "Lowercase version of recipient address used on this message's SMTP envelope",
              sampleValue: 'recipient@example.com',
            },
            reason: {
              description:
                'Canonicalized text of the response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (a.b.c.d) is in block list',
            },
            recv_method: {
              description: 'Protocol by which SparkPost received this message',
              sampleValue: 'esmtp',
            },
            routing_domain: {
              description: 'Domain receiving this message',
              sampleValue: 'example.com',
            },
            sending_ip: {
              description: 'IP address through which this message was sent',
              sampleValue: '127.0.0.1',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            subject: {
              description: 'Subject line from the email header',
              sampleValue: 'Summer deals are here!',
            },
            template_id: {
              description: 'Slug of the template used to construct this message',
              sampleValue: 'templ-1234',
            },
            template_version: {
              description: 'Version of the template used to construct this message',
              sampleValue: '1',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            transmission_id: {
              description: 'Transmission which originated this message',
              sampleValue: '65832150921904138',
            },
          },
          description:
            'Remote MTA initially reported acceptance of a message, but it has since asynchronously reported that the message was not delivered.',
          display_name: 'Out of Band',
        },
        policy_rejection: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'policy_rejection',
            },
            campaign_id: {
              description: 'Campaign of which this message was a part',
              sampleValue: 'Example Campaign Name',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            error_code: {
              description:
                'Error code by which the remote server described a failed delivery attempt',
              sampleValue: '554',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            friendly_from: {
              description: 'Friendly sender or "From" header in the original email',
              sampleValue: 'sender@example.com',
            },
            injection_time: {
              description: 'Time at which this message was injected into SparkPost',
              sampleValue: '2016-04-18T14:25:07.000Z',
            },
            message_id: {
              description: 'SparkPost-cluster-wide unique identifier for this message',
              sampleValue: '000443ee14578172be22',
            },
            msg_from: {
              description: "Sender address used on this message's SMTP envelope",
              sampleValue: 'sender@example.com',
            },
            rcpt_meta: {
              description: 'Metadata describing the message recipient',
              sampleValue: {
                customKey: 'customValue',
              },
            },
            rcpt_tags: {
              description: 'Tags applied to the message which generated this event',
              sampleValue: ['male', 'US'],
            },
            rcpt_to: {
              description:
                "Lowercase version of recipient address used on this message's SMTP envelope",
              sampleValue: 'recipient@example.com',
            },
            raw_rcpt_to: {
              description: "Actual recipient address used on this message's SMTP envelope",
              sampleValue: 'Recipient@example.com',
            },
            rcpt_type: {
              description:
                'Indicates that a recipient address appeared in the Cc or Bcc header or the archive JSON array',
              sampleValue: 'cc',
            },
            raw_reason: {
              description:
                'Unmodified, exact response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (17.99.99.99) is in block list',
            },
            reason: {
              description:
                'Canonicalized text of the response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (a.b.c.d) is in block list',
            },
            recv_method: {
              description: 'Protocol by which SparkPost received this message',
              sampleValue: 'esmtp',
            },
            remote_addr: {
              description: 'IP address of the host from which SparkPost received this message',
              sampleValue: '127.0.0.1',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            template_id: {
              description: 'Slug of the template used to construct this message',
              sampleValue: 'templ-1234',
            },
            template_version: {
              description: 'Version of the template used to construct this message',
              sampleValue: '1',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            transmission_id: {
              description: 'Transmission which originated this message',
              sampleValue: '65832150921904138',
            },
            bounce_class: {
              description:
                'Classification code for a given message (see [Bounce Classification Codes](https://support.sparkpost.com/customer/portal/articles/1929896))',
              sampleValue: '1',
            },
          },
          description:
            'Due to policy, SparkPost rejected a message or failed to generate a message.',
          display_name: 'Policy Rejection',
        },
        delay: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'delay',
            },
            bounce_class: {
              description:
                'Classification code for a given message (see [Bounce Classification Codes](https://support.sparkpost.com/customer/portal/articles/1929896))',
              sampleValue: '1',
            },
            campaign_id: {
              description: 'Campaign of which this message was a part',
              sampleValue: 'Example Campaign Name',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            delv_method: {
              description: 'Protocol by which SparkPost delivered this message',
              sampleValue: 'esmtp',
            },
            device_token: {
              description:
                'Token of the device / application targeted by this PUSH notification message. Applies only when delv_method is gcm or apn.',
              sampleValue: '45c19189783f867973f6e6a5cca60061ffe4fa77c547150563a1192fa9847f8a',
            },
            error_code: {
              description:
                'Error code by which the remote server described a failed delivery attempt',
              sampleValue: '554',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            friendly_from: {
              description: 'Friendly sender or "From" header in the original email',
              sampleValue: 'sender@example.com',
            },
            injection_time: {
              description: 'Time at which this message was injected into SparkPost',
              sampleValue: '2016-04-18T14:25:07.000Z',
            },
            ip_address: {
              description:
                'IP address of the host to which SparkPost delivered this message; in engagement events, the IP address of the host where the HTTP request originated',
              sampleValue: '127.0.0.1',
            },
            ip_pool: {
              description: 'IP pool through which this message was sent',
              sampleValue: 'Example-Ip-Pool',
            },
            message_id: {
              description: 'SparkPost-cluster-wide unique identifier for this message',
              sampleValue: '000443ee14578172be22',
            },
            msg_from: {
              description: "Sender address used on this message's SMTP envelope",
              sampleValue: 'sender@example.com',
            },
            msg_size: {
              description: "Message's size in bytes",
              sampleValue: '1337',
            },
            num_retries: {
              description:
                'Number of failed attempts before this message was successfully delivered; when the first attempt succeeds, zero',
              sampleValue: '2',
            },
            queue_time: {
              description:
                "Delay, expressed in milliseconds, between this message's injection into SparkPost and its delivery to the receiving domain; that is, the length of time this message spent in the outgoing queue",
              sampleValue: '12',
            },
            rcpt_meta: {
              description: 'Metadata describing the message recipient',
              sampleValue: {
                customKey: 'customValue',
              },
            },
            rcpt_tags: {
              description: 'Tags applied to the message which generated this event',
              sampleValue: ['male', 'US'],
            },
            rcpt_to: {
              description:
                "Lowercase version of recipient address used on this message's SMTP envelope",
              sampleValue: 'recipient@example.com',
            },
            raw_rcpt_to: {
              description: "Actual recipient address used on this message's SMTP envelope",
              sampleValue: 'Recipient@example.com',
            },
            rcpt_type: {
              description:
                'Indicates that a recipient address appeared in the Cc or Bcc header or the archive JSON array',
              sampleValue: 'cc',
            },
            raw_reason: {
              description:
                'Unmodified, exact response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (17.99.99.99) is in block list',
            },
            reason: {
              description:
                'Canonicalized text of the response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (a.b.c.d) is in block list',
            },
            recv_method: {
              description: 'Protocol by which SparkPost received this message',
              sampleValue: 'esmtp',
            },
            routing_domain: {
              description: 'Domain receiving this message',
              sampleValue: 'example.com',
            },
            sending_ip: {
              description: 'IP address through which this message was sent',
              sampleValue: '127.0.0.1',
            },
            sms_coding: {
              description: 'Data encoding used in the SMS message',
              sampleValue: 'ASCII',
            },
            sms_dst: {
              description: 'SMS destination address',
              sampleValue: '7876712656',
            },
            sms_dst_npi: {
              description: 'Destination numbering plan identification',
              sampleValue: 'E164',
            },
            sms_dst_ton: {
              description: 'Type of number for the destination address',
              sampleValue: 'International',
            },
            sms_src: {
              description: 'SMS source address',
              sampleValue: '1234',
            },
            sms_src_npi: {
              description: 'Source numbering plan identification',
              sampleValue: 'E164',
            },
            sms_src_ton: {
              description: 'Type of number for the source address',
              sampleValue: 'Unknown',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            subject: {
              description: 'Subject line from the email header',
              sampleValue: 'Summer deals are here!',
            },
            template_id: {
              description: 'Slug of the template used to construct this message',
              sampleValue: 'templ-1234',
            },
            template_version: {
              description: 'Version of the template used to construct this message',
              sampleValue: '1',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            transmission_id: {
              description: 'Transmission which originated this message',
              sampleValue: '65832150921904138',
            },
          },
          description: 'Remote MTA has temporarily rejected a message.',
          display_name: 'Delay',
        },
      },
      description:
        'Message events describe the life cycle of a message including injection, delivery, and disposition.',
      display_name: 'Message Events',
    },
    track_event: {
      events: {
        click: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'click',
            },
            campaign_id: {
              description: 'Campaign of which this message was a part',
              sampleValue: 'Example Campaign Name',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            delv_method: {
              description: 'Protocol by which SparkPost delivered this message',
              sampleValue: 'esmtp',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            friendly_from: {
              description: 'Friendly sender or "From" header in the original email',
              sampleValue: 'sender@example.com',
            },
            injection_time: {
              description: 'Time at which this message was injected into SparkPost',
              sampleValue: '2016-04-18T14:25:07.000Z',
            },
            ip_address: {
              description:
                'IP address of the host to which SparkPost delivered this message; in engagement events, the IP address of the host where the HTTP request originated',
              sampleValue: '127.0.0.1',
            },
            ip_pool: {
              description: 'IP pool through which this message was sent',
              sampleValue: 'Example-Ip-Pool',
            },
            message_id: {
              description: 'SparkPost-cluster-wide unique identifier for this message',
              sampleValue: '000443ee14578172be22',
            },
            msg_from: {
              description: "Sender address used on this message's SMTP envelope",
              sampleValue: 'sender@example.com',
            },
            msg_size: {
              description: "Message's size in bytes",
              sampleValue: '1337',
            },
            num_retries: {
              description:
                'Number of failed attempts before this message was successfully delivered; when the first attempt succeeds, zero',
              sampleValue: '2',
            },
            queue_time: {
              description:
                "Delay, expressed in milliseconds, between this message's injection into SparkPost and its delivery to the receiving domain; that is, the length of time this message spent in the outgoing queue",
              sampleValue: '12',
            },
            rcpt_meta: {
              description: 'Metadata describing the message recipient',
              sampleValue: {
                customKey: 'customValue',
              },
            },
            rcpt_tags: {
              description: 'Tags applied to the message which generated this event',
              sampleValue: ['male', 'US'],
            },
            rcpt_to: {
              description:
                "Lowercase version of recipient address used on this message's SMTP envelope",
              sampleValue: 'recipient@example.com',
            },
            raw_rcpt_to: {
              description: "Actual recipient address used on this message's SMTP envelope",
              sampleValue: 'Recipient@example.com',
            },
            rcpt_type: {
              description:
                'Indicates that a recipient address appeared in the Cc or Bcc header or the archive JSON array',
              sampleValue: 'cc',
            },
            routing_domain: {
              description: 'Domain receiving this message',
              sampleValue: 'example.com',
            },
            sending_ip: {
              description: 'IP address through which this message was sent',
              sampleValue: '127.0.0.1',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            subject: {
              description: 'Subject line from the email header',
              sampleValue: 'Summer deals are here!',
            },
            target_link_name: {
              description: 'Name of the link for which a click event was generated',
              sampleValue: 'Example Link Name',
            },
            target_link_url: {
              description: 'URL of the link for which a click event was generated',
              sampleValue: 'http://example.com',
            },
            template_id: {
              description: 'Slug of the template used to construct this message',
              sampleValue: 'templ-1234',
            },
            template_version: {
              description: 'Version of the template used to construct this message',
              sampleValue: '1',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            transmission_id: {
              description: 'Transmission which originated this message',
              sampleValue: '65832150921904138',
            },
            user_agent: {
              description: "Value of the browser's User-Agent header",
              sampleValue:
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36',
            },
            geo_ip: {
              description:
                'Geographic location based on the IP address, including latitude, longitude, city, country, and region',
              sampleValue: {
                country: 'US',
                region: 'MD',
                city: 'Columbia',
                latitude: 39.1749,
                longitude: -76.8375,
              },
            },
          },
          description:
            "Recipient clicked a tracked link in a message, thus prompting a redirect through the SparkPost click-tracking server to the link's destination.",
          display_name: 'Click',
        },
        open: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'open',
            },
            campaign_id: {
              description: 'Campaign of which this message was a part',
              sampleValue: 'Example Campaign Name',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            delv_method: {
              description: 'Protocol by which SparkPost delivered this message',
              sampleValue: 'esmtp',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            friendly_from: {
              description: 'Friendly sender or "From" header in the original email',
              sampleValue: 'sender@example.com',
            },
            injection_time: {
              description: 'Time at which this message was injected into SparkPost',
              sampleValue: '2016-04-18T14:25:07.000Z',
            },
            ip_address: {
              description:
                'IP address of the host to which SparkPost delivered this message; in engagement events, the IP address of the host where the HTTP request originated',
              sampleValue: '127.0.0.1',
            },
            ip_pool: {
              description: 'IP pool through which this message was sent',
              sampleValue: 'Example-Ip-Pool',
            },
            message_id: {
              description: 'SparkPost-cluster-wide unique identifier for this message',
              sampleValue: '000443ee14578172be22',
            },
            msg_from: {
              description: "Sender address used on this message's SMTP envelope",
              sampleValue: 'sender@example.com',
            },
            msg_size: {
              description: "Message's size in bytes",
              sampleValue: '1337',
            },
            num_retries: {
              description:
                'Number of failed attempts before this message was successfully delivered; when the first attempt succeeds, zero',
              sampleValue: '2',
            },
            queue_time: {
              description:
                "Delay, expressed in milliseconds, between this message's injection into SparkPost and its delivery to the receiving domain; that is, the length of time this message spent in the outgoing queue",
              sampleValue: '12',
            },
            rcpt_meta: {
              description: 'Metadata describing the message recipient',
              sampleValue: {
                customKey: 'customValue',
              },
            },
            rcpt_tags: {
              description: 'Tags applied to the message which generated this event',
              sampleValue: ['male', 'US'],
            },
            rcpt_to: {
              description:
                "Lowercase version of recipient address used on this message's SMTP envelope",
              sampleValue: 'recipient@example.com',
            },
            raw_rcpt_to: {
              description: "Actual recipient address used on this message's SMTP envelope",
              sampleValue: 'Recipient@example.com',
            },
            rcpt_type: {
              description:
                'Indicates that a recipient address appeared in the Cc or Bcc header or the archive JSON array',
              sampleValue: 'cc',
            },
            routing_domain: {
              description: 'Domain receiving this message',
              sampleValue: 'example.com',
            },
            sending_ip: {
              description: 'IP address through which this message was sent',
              sampleValue: '127.0.0.1',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            subject: {
              description: 'Subject line from the email header',
              sampleValue: 'Summer deals are here!',
            },
            template_id: {
              description: 'Slug of the template used to construct this message',
              sampleValue: 'templ-1234',
            },
            template_version: {
              description: 'Version of the template used to construct this message',
              sampleValue: '1',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            transmission_id: {
              description: 'Transmission which originated this message',
              sampleValue: '65832150921904138',
            },
            user_agent: {
              description: "Value of the browser's User-Agent header",
              sampleValue:
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36',
            },
            geo_ip: {
              description:
                'Geographic location based on the IP address, including latitude, longitude, city, country, and region',
              sampleValue: {
                country: 'US',
                region: 'MD',
                city: 'Columbia',
                latitude: 39.1749,
                longitude: -76.8375,
              },
            },
          },
          description:
            'Recipient opened a message in a mail client, thus rendering a tracking pixel at the bottom of the message.',
          display_name: 'Open',
        },
        initial_open: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'initial_open',
            },
            campaign_id: {
              description: 'Campaign of which this message was a part',
              sampleValue: 'Example Campaign Name',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            delv_method: {
              description: 'Protocol by which SparkPost delivered this message',
              sampleValue: 'esmtp',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            friendly_from: {
              description: 'Friendly sender or "From" header in the original email',
              sampleValue: 'sender@example.com',
            },
            injection_time: {
              description: 'Time at which this message was injected into SparkPost',
              sampleValue: '2016-04-18T14:25:07.000Z',
            },
            ip_address: {
              description:
                'IP address of the host to which SparkPost delivered this message; in engagement events, the IP address of the host where the HTTP request originated',
              sampleValue: '127.0.0.1',
            },
            ip_pool: {
              description: 'IP pool through which this message was sent',
              sampleValue: 'Example-Ip-Pool',
            },
            message_id: {
              description: 'SparkPost-cluster-wide unique identifier for this message',
              sampleValue: '000443ee14578172be22',
            },
            msg_from: {
              description: "Sender address used on this message's SMTP envelope",
              sampleValue: 'sender@example.com',
            },
            msg_size: {
              description: "Message's size in bytes",
              sampleValue: '1337',
            },
            num_retries: {
              description:
                'Number of failed attempts before this message was successfully delivered; when the first attempt succeeds, zero',
              sampleValue: '2',
            },
            queue_time: {
              description:
                "Delay, expressed in milliseconds, between this message's injection into SparkPost and its delivery to the receiving domain; that is, the length of time this message spent in the outgoing queue",
              sampleValue: '12',
            },
            rcpt_meta: {
              description: 'Metadata describing the message recipient',
              sampleValue: {
                customKey: 'customValue',
              },
            },
            rcpt_tags: {
              description: 'Tags applied to the message which generated this event',
              sampleValue: ['male', 'US'],
            },
            rcpt_to: {
              description:
                "Lowercase version of recipient address used on this message's SMTP envelope",
              sampleValue: 'recipient@example.com',
            },
            raw_rcpt_to: {
              description: "Actual recipient address used on this message's SMTP envelope",
              sampleValue: 'Recipient@example.com',
            },
            rcpt_type: {
              description:
                'Indicates that a recipient address appeared in the Cc or Bcc header or the archive JSON array',
              sampleValue: 'cc',
            },
            routing_domain: {
              description: 'Domain receiving this message',
              sampleValue: 'example.com',
            },
            sending_ip: {
              description: 'IP address through which this message was sent',
              sampleValue: '127.0.0.1',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            subject: {
              description: 'Subject line from the email header',
              sampleValue: 'Summer deals are here!',
            },
            template_id: {
              description: 'Slug of the template used to construct this message',
              sampleValue: 'templ-1234',
            },
            template_version: {
              description: 'Version of the template used to construct this message',
              sampleValue: '1',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            transmission_id: {
              description: 'Transmission which originated this message',
              sampleValue: '65832150921904138',
            },
            user_agent: {
              description: "Value of the browser's User-Agent header",
              sampleValue:
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36',
            },
            geo_ip: {
              description:
                'Geographic location based on the IP address, including latitude, longitude, city, country, and region',
              sampleValue: {
                country: 'US',
                region: 'MD',
                city: 'Columbia',
                latitude: 39.1749,
                longitude: -76.8375,
              },
            },
          },
          description:
            'Recipient opened a message in a mail client, thus rendering a tracking pixel at the top of the message.',
          display_name: 'Initial Open',
        },
      },
      description:
        'Engagement events describe the behavior of a recipient with respect to the message sent.',
      display_name: 'Engagement Events',
    },
    gen_event: {
      events: {
        generation_failure: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'generation_failure',
            },
            campaign_id: {
              description: 'Campaign of which this message was a part',
              sampleValue: 'Example Campaign Name',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            error_code: {
              description:
                'Error code by which the remote server described a failed delivery attempt',
              sampleValue: '554',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            friendly_from: {
              description: 'Friendly sender or "From" header in the original email',
              sampleValue: 'sender@example.com',
            },
            ip_pool: {
              description: 'IP pool through which this message was sent',
              sampleValue: 'Example-Ip-Pool',
            },
            rcpt_meta: {
              description: 'Metadata describing the message recipient',
              sampleValue: {
                customKey: 'customValue',
              },
            },
            rcpt_subs: {
              description: 'Substitutions applied to the template to construct this message',
              sampleValue: {
                country: 'US',
                gender: 'Female',
              },
            },
            rcpt_tags: {
              description: 'Tags applied to the message which generated this event',
              sampleValue: ['male', 'US'],
            },
            rcpt_to: {
              description:
                "Lowercase version of recipient address used on this message's SMTP envelope",
              sampleValue: 'recipient@example.com',
            },
            raw_rcpt_to: {
              description: "Actual recipient address used on this message's SMTP envelope",
              sampleValue: 'Recipient@example.com',
            },
            raw_reason: {
              description:
                'Unmodified, exact response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (17.99.99.99) is in block list',
            },
            reason: {
              description:
                'Canonicalized text of the response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (a.b.c.d) is in block list',
            },
            recv_method: {
              description: 'Protocol by which SparkPost received this message',
              sampleValue: 'esmtp',
            },
            routing_domain: {
              description: 'Domain receiving this message',
              sampleValue: 'example.com',
            },
            sending_ip: {
              description: 'IP address through which this message was sent',
              sampleValue: '127.0.0.1',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            template_id: {
              description: 'Slug of the template used to construct this message',
              sampleValue: 'templ-1234',
            },
            template_version: {
              description: 'Version of the template used to construct this message',
              sampleValue: '1',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            transmission_id: {
              description: 'Transmission which originated this message',
              sampleValue: '65832150921904138',
            },
          },
          description: 'Message generation failed for an intended recipient.',
          display_name: 'Generation Failure',
        },
        generation_rejection: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'generation_rejection',
            },
            campaign_id: {
              description: 'Campaign of which this message was a part',
              sampleValue: 'Example Campaign Name',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            error_code: {
              description:
                'Error code by which the remote server described a failed delivery attempt',
              sampleValue: '554',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            friendly_from: {
              description: 'Friendly sender or "From" header in the original email',
              sampleValue: 'sender@example.com',
            },
            ip_pool: {
              description: 'IP pool through which this message was sent',
              sampleValue: 'Example-Ip-Pool',
            },
            rcpt_meta: {
              description: 'Metadata describing the message recipient',
              sampleValue: {
                customKey: 'customValue',
              },
            },
            rcpt_subs: {
              description: 'Substitutions applied to the template to construct this message',
              sampleValue: {
                country: 'US',
                gender: 'Female',
              },
            },
            rcpt_tags: {
              description: 'Tags applied to the message which generated this event',
              sampleValue: ['male', 'US'],
            },
            rcpt_to: {
              description:
                "Lowercase version of recipient address used on this message's SMTP envelope",
              sampleValue: 'recipient@example.com',
            },
            raw_rcpt_to: {
              description: "Actual recipient address used on this message's SMTP envelope",
              sampleValue: 'Recipient@example.com',
            },
            raw_reason: {
              description:
                'Unmodified, exact response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (17.99.99.99) is in block list',
            },
            reason: {
              description:
                'Canonicalized text of the response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (a.b.c.d) is in block list',
            },
            recv_method: {
              description: 'Protocol by which SparkPost received this message',
              sampleValue: 'esmtp',
            },
            routing_domain: {
              description: 'Domain receiving this message',
              sampleValue: 'example.com',
            },
            sending_ip: {
              description: 'IP address through which this message was sent',
              sampleValue: '127.0.0.1',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            subject: {
              description: 'Subject line from the email header',
              sampleValue: 'Summer deals are here!',
            },
            template_id: {
              description: 'Slug of the template used to construct this message',
              sampleValue: 'templ-1234',
            },
            template_version: {
              description: 'Version of the template used to construct this message',
              sampleValue: '1',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            transmission_id: {
              description: 'Transmission which originated this message',
              sampleValue: '65832150921904138',
            },
            bounce_class: {
              description:
                'Classification code for a given message (see [Bounce Classification Codes](https://support.sparkpost.com/customer/portal/articles/1929896))',
              sampleValue: '1',
            },
          },
          description: 'SparkPost rejected message generation due to policy.',
          display_name: 'Generation Rejection',
        },
      },
      description:
        'Generation events provide insight into message generation failures or rejections.',
      display_name: 'Generation Events',
    },
    unsubscribe_event: {
      events: {
        list_unsubscribe: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'list_unsubscribe',
            },
            campaign_id: {
              description: 'Campaign of which this message was a part',
              sampleValue: 'Example Campaign Name',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            friendly_from: {
              description: 'Friendly sender or "From" header in the original email',
              sampleValue: 'sender@example.com',
            },
            injection_time: {
              description: 'Time at which this message was injected into SparkPost',
              sampleValue: '2016-04-18T14:25:07.000Z',
            },
            ip_address: {
              description:
                'IP address of the host to which SparkPost delivered this message; in engagement events, the IP address of the host where the HTTP request originated',
              sampleValue: '127.0.0.1',
            },
            ip_pool: {
              description: 'IP pool through which this message was sent',
              sampleValue: 'Example-Ip-Pool',
            },
            mailfrom: {
              description: 'Envelope mailfrom of the original email',
              sampleValue: 'recipient@example.com',
            },
            message_id: {
              description: 'SparkPost-cluster-wide unique identifier for this message',
              sampleValue: '000443ee14578172be22',
            },
            msg_from: {
              description: "Sender address used on this message's SMTP envelope",
              sampleValue: 'sender@example.com',
            },
            msg_size: {
              description: "Message's size in bytes",
              sampleValue: '1337',
            },
            num_retries: {
              description:
                'Number of failed attempts before this message was successfully delivered; when the first attempt succeeds, zero',
              sampleValue: '2',
            },
            queue_time: {
              description:
                "Delay, expressed in milliseconds, between this message's injection into SparkPost and its delivery to the receiving domain; that is, the length of time this message spent in the outgoing queue",
              sampleValue: '12',
            },
            raw_rcpt_to: {
              description: "Actual recipient address used on this message's SMTP envelope",
              sampleValue: 'Recipient@example.com',
            },
            rcpt_meta: {
              description: 'Metadata describing the message recipient',
              sampleValue: {
                customKey: 'customValue',
              },
            },
            rcpt_tags: {
              description: 'Tags applied to the message which generated this event',
              sampleValue: ['male', 'US'],
            },
            rcpt_to: {
              description:
                "Lowercase version of recipient address used on this message's SMTP envelope",
              sampleValue: 'recipient@example.com',
            },
            rcpt_type: {
              description:
                'Indicates that a recipient address appeared in the Cc or Bcc header or the archive JSON array',
              sampleValue: 'cc',
            },
            recv_method: {
              description: 'Protocol by which SparkPost received this message',
              sampleValue: 'esmtp',
            },
            routing_domain: {
              description: 'Domain receiving this message',
              sampleValue: 'example.com',
            },
            sending_ip: {
              description: 'IP address through which this message was sent',
              sampleValue: '127.0.0.1',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            subject: {
              description: 'Subject line from the email header',
              sampleValue: 'Summer deals are here!',
            },
            template_id: {
              description: 'Slug of the template used to construct this message',
              sampleValue: 'templ-1234',
            },
            template_version: {
              description: 'Version of the template used to construct this message',
              sampleValue: '1',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            transmission_id: {
              description: 'Transmission which originated this message',
              sampleValue: '65832150921904138',
            },
          },
          description: "User clicked the 'unsubscribe' button on an email client.",
          display_name: 'List Unsubscribe',
        },
        link_unsubscribe: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'link_unsubscribe',
            },
            campaign_id: {
              description: 'Campaign of which this message was a part',
              sampleValue: 'Example Campaign Name',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            delv_method: {
              description: 'Protocol by which SparkPost delivered this message',
              sampleValue: 'esmtp',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            friendly_from: {
              description: 'Friendly sender or "From" header in the original email',
              sampleValue: 'sender@example.com',
            },
            injection_time: {
              description: 'Time at which this message was injected into SparkPost',
              sampleValue: '2016-04-18T14:25:07.000Z',
            },
            ip_address: {
              description:
                'IP address of the host to which SparkPost delivered this message; in engagement events, the IP address of the host where the HTTP request originated',
              sampleValue: '127.0.0.1',
            },
            ip_pool: {
              description: 'IP pool through which this message was sent',
              sampleValue: 'Example-Ip-Pool',
            },
            mailfrom: {
              description: 'Envelope mailfrom of the original email',
              sampleValue: 'recipient@example.com',
            },
            message_id: {
              description: 'SparkPost-cluster-wide unique identifier for this message',
              sampleValue: '000443ee14578172be22',
            },
            msg_from: {
              description: "Sender address used on this message's SMTP envelope",
              sampleValue: 'sender@example.com',
            },
            msg_size: {
              description: "Message's size in bytes",
              sampleValue: '1337',
            },
            num_retries: {
              description:
                'Number of failed attempts before this message was successfully delivered; when the first attempt succeeds, zero',
              sampleValue: '2',
            },
            queue_time: {
              description:
                "Delay, expressed in milliseconds, between this message's injection into SparkPost and its delivery to the receiving domain; that is, the length of time this message spent in the outgoing queue",
              sampleValue: '12',
            },
            raw_rcpt_to: {
              description: "Actual recipient address used on this message's SMTP envelope",
              sampleValue: 'Recipient@example.com',
            },
            rcpt_meta: {
              description: 'Metadata describing the message recipient',
              sampleValue: {
                customKey: 'customValue',
              },
            },
            rcpt_tags: {
              description: 'Tags applied to the message which generated this event',
              sampleValue: ['male', 'US'],
            },
            rcpt_to: {
              description:
                "Lowercase version of recipient address used on this message's SMTP envelope",
              sampleValue: 'recipient@example.com',
            },
            rcpt_type: {
              description:
                'Indicates that a recipient address appeared in the Cc or Bcc header or the archive JSON array',
              sampleValue: 'cc',
            },
            recv_method: {
              description: 'Protocol by which SparkPost received this message',
              sampleValue: 'esmtp',
            },
            routing_domain: {
              description: 'Domain receiving this message',
              sampleValue: 'example.com',
            },
            sending_ip: {
              description: 'IP address through which this message was sent',
              sampleValue: '127.0.0.1',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            subject: {
              description: 'Subject line from the email header',
              sampleValue: 'Summer deals are here!',
            },
            template_id: {
              description: 'Slug of the template used to construct this message',
              sampleValue: 'templ-1234',
            },
            template_version: {
              description: 'Version of the template used to construct this message',
              sampleValue: '1',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            transmission_id: {
              description: 'Transmission which originated this message',
              sampleValue: '65832150921904138',
            },
            user_agent: {
              description: "Value of the browser's User-Agent header",
              sampleValue:
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36',
            },
          },
          description: 'User clicked a hyperlink in a received email.',
          display_name: 'Link Unsubscribe',
        },
      },
      description:
        'Unsubscribe events provide insight into the action the user performed to become unsubscribed.',
      display_name: 'Unsubscribe Events',
    },
    relay_event: {
      events: {
        relay_injection: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'relay_injection',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            rcpt_to: {
              description:
                "Lowercase version of recipient address used on this message's SMTP envelope",
              sampleValue: 'recipient@example.com',
            },
            raw_rcpt_to: {
              description: "Actual recipient address used on this message's SMTP envelope",
              sampleValue: 'Recipient@example.com',
            },
            msg_size: {
              description: "Message's size in bytes",
              sampleValue: '1337',
            },
            routing_domain: {
              description: 'Domain receiving this message',
              sampleValue: 'example.com',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            sending_ip: {
              description: 'IP address through which this message was sent',
              sampleValue: '127.0.0.1',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            ip_pool: {
              description: 'IP pool through which this message was sent',
              sampleValue: 'Example-Ip-Pool',
            },
            msg_from: {
              description: "Sender address used on this message's SMTP envelope",
              sampleValue: 'sender@example.com',
            },
            recv_method: {
              description: 'Protocol by which SparkPost received this message',
              sampleValue: 'esmtp',
            },
          },
          description: 'Relayed message is received by or injected into SparkPost.',
          display_name: 'Relay Injection',
        },
        relay_rejection: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'relay_rejection',
            },
            raw_reason: {
              description:
                'Unmodified, exact response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (17.99.99.99) is in block list',
            },
            reason: {
              description:
                'Canonicalized text of the response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (a.b.c.d) is in block list',
            },
            rcpt_to: {
              description:
                "Lowercase version of recipient address used on this message's SMTP envelope",
              sampleValue: 'recipient@example.com',
            },
            raw_rcpt_to: {
              description: "Actual recipient address used on this message's SMTP envelope",
              sampleValue: 'Recipient@example.com',
            },
            error_code: {
              description:
                'Error code by which the remote server described a failed delivery attempt',
              sampleValue: '554',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            msg_from: {
              description: "Sender address used on this message's SMTP envelope",
              sampleValue: 'sender@example.com',
            },
            recv_method: {
              description: 'Protocol by which SparkPost received this message',
              sampleValue: 'esmtp',
            },
            remote_addr: {
              description: 'IP address of the host from which SparkPost received this message',
              sampleValue: '127.0.0.1',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            bounce_class: {
              description:
                'Classification code for a given message (see [Bounce Classification Codes](https://support.sparkpost.com/customer/portal/articles/1929896))',
              sampleValue: '1',
            },
          },
          description:
            'SparkPost rejected a relayed message or failed to generate a relayed message.',
          display_name: 'Relay Rejection',
        },
        relay_delivery: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'relay_delivery',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            routing_domain: {
              description: 'Domain receiving this message',
              sampleValue: 'example.com',
            },
            msg_from: {
              description: "Sender address used on this message's SMTP envelope",
              sampleValue: 'sender@example.com',
            },
            recv_method: {
              description: 'Protocol by which SparkPost received this message',
              sampleValue: 'esmtp',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            ip_pool: {
              description: 'IP pool through which this message was sent',
              sampleValue: 'Example-Ip-Pool',
            },
            queue_time: {
              description:
                "Delay, expressed in milliseconds, between this message's injection into SparkPost and its delivery to the receiving domain; that is, the length of time this message spent in the outgoing queue",
              sampleValue: '12',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            num_retries: {
              description:
                'Number of failed attempts before this message was successfully delivered; when the first attempt succeeds, zero',
              sampleValue: '2',
            },
            delv_method: {
              description: 'Protocol by which SparkPost delivered this message',
              sampleValue: 'esmtp',
            },
            sending_ip: {
              description: 'IP address through which this message was sent',
              sampleValue: '127.0.0.1',
            },
          },
          description: 'Remote HTTP Endpoint acknowledged receipt of a relayed message.',
          display_name: 'Relay Delivery',
        },
        relay_tempfail: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'relay_tempfail',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            routing_domain: {
              description: 'Domain receiving this message',
              sampleValue: 'example.com',
            },
            msg_from: {
              description: "Sender address used on this message's SMTP envelope",
              sampleValue: 'sender@example.com',
            },
            recv_method: {
              description: 'Protocol by which SparkPost received this message',
              sampleValue: 'esmtp',
            },
            ip_pool: {
              description: 'IP pool through which this message was sent',
              sampleValue: 'Example-Ip-Pool',
            },
            queue_time: {
              description:
                "Delay, expressed in milliseconds, between this message's injection into SparkPost and its delivery to the receiving domain; that is, the length of time this message spent in the outgoing queue",
              sampleValue: '12',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            num_retries: {
              description:
                'Number of failed attempts before this message was successfully delivered; when the first attempt succeeds, zero',
              sampleValue: '2',
            },
            delv_method: {
              description: 'Protocol by which SparkPost delivered this message',
              sampleValue: 'esmtp',
            },
            raw_reason: {
              description:
                'Unmodified, exact response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (17.99.99.99) is in block list',
            },
            reason: {
              description:
                'Canonicalized text of the response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (a.b.c.d) is in block list',
            },
            sending_ip: {
              description: 'IP address through which this message was sent',
              sampleValue: '127.0.0.1',
            },
            error_code: {
              description:
                'Error code by which the remote server described a failed delivery attempt',
              sampleValue: '554',
            },
          },
          description: 'Remote HTTP Endpoint has failed to accept a relayed message.',
          display_name: 'Relay Temporary Failure',
        },
        relay_permfail: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'relay_permfail',
            },
            event_id: {
              description: 'Unique event identifier',
              sampleValue: '92356927693813856',
            },
            routing_domain: {
              description: 'Domain receiving this message',
              sampleValue: 'example.com',
            },
            msg_from: {
              description: "Sender address used on this message's SMTP envelope",
              sampleValue: 'sender@example.com',
            },
            recv_method: {
              description: 'Protocol by which SparkPost received this message',
              sampleValue: 'esmtp',
            },
            ip_pool: {
              description: 'IP pool through which this message was sent',
              sampleValue: 'Example-Ip-Pool',
            },
            queue_time: {
              description:
                "Delay, expressed in milliseconds, between this message's injection into SparkPost and its delivery to the receiving domain; that is, the length of time this message spent in the outgoing queue",
              sampleValue: '12',
            },
            subaccount_id: {
              description: 'Unique subaccount identifier.',
              sampleValue: '101',
            },
            customer_id: {
              description: 'SparkPost-customer identifier through which this message was sent',
              sampleValue: '1',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            num_retries: {
              description:
                'Number of failed attempts before this message was successfully delivered; when the first attempt succeeds, zero',
              sampleValue: '2',
            },
            delv_method: {
              description: 'Protocol by which SparkPost delivered this message',
              sampleValue: 'esmtp',
            },
            raw_reason: {
              description:
                'Unmodified, exact response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (17.99.99.99) is in block list',
            },
            reason: {
              description:
                'Canonicalized text of the response returned by the remote server due to a failed delivery attempt',
              sampleValue: 'MAIL REFUSED - IP (a.b.c.d) is in block list',
            },
            sending_ip: {
              description: 'IP address through which this message was sent',
              sampleValue: '127.0.0.1',
            },
            error_code: {
              description:
                'Error code by which the remote server described a failed delivery attempt',
              sampleValue: '554',
            },
          },
          description:
            'Relayed message has reached the maximum retry threshold and will be removed from the system.',
          display_name: 'Relay Permanent Failure',
        },
      },
      description:
        'Relay events describe the life cycle of an inbound message including injection, delivery, and disposition.',
      display_name: 'Relay Events',
    },
    ab_test_event: {
      events: {
        ab_test_completed: {
          event: {
            type: {
              description: 'Type of event this record describes',
              sampleValue: 'ab_test_completed',
            },
            event_id: {
              description: 'Universally unique identifier',
              sampleValue: '0e5cf1fc-cb36-4c39-b695-3651b6ea6563',
            },
            timestamp: {
              description:
                'Event date and time, in Unix timestamp format (integer seconds since 00:00:00 GMT 1970-01-01)',
              sampleValue: '1460989507',
            },
            ab_test: {
              description: 'Metadata describing an A/B test',
              sampleValue: {
                customer_id: '1',
                subaccount_id: '101',
                id: 'password-reset',
                name: 'Password Reset',
                version: 1,
                test_mode: 'bayesian',
                winning_template_id: 'templ-1234',
                engagement_metric: 'count_unique_clicked',
                default_template: {
                  template_id: 'templ-1234',
                  count_unique_clicked: 10,
                  count_accepted: 50,
                  engagement_rate: 0.2,
                },
                variants: [
                  {
                    template_id: 'templ-5678',
                    count_unique_clicked: 10,
                    count_accepted: 50,
                    engagement_rate: 0.2,
                  },
                ],
              },
            },
          },
          description: 'Results of an A/B test',
          display_name: 'A/B Test Completion',
        },
      },
      description: 'A/B test events describe the result of a completed A/B test.',
      display_name: 'A/B Test Events',
    },
  },
});
