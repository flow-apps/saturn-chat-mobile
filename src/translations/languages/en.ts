export const en = {
  Components: {
    Ads: {
      remove_ad: "Remove ad",
    },
    GroupInvite: {
      participants: "participants",
      join: "Join",
    },
    FriendActionButtons: {
      title: "wants to be your friend",
      accept: "Accept",
      reject: "Decline",
    },
    AddFriendButton: {
      friends: "Friends",
      requested: "Request sent",
      request: "Add friend",
    },
    Chat: {
      AudioPlayer: {},
      CurrentReplyingMessage: {
        file_amount_one: "file",
        file_amount_other: "files",
        replying_text: "You are replying to:",
        voice_message: "Voice message",
      },
      FilePreview: {
        alerts: {
          download: {
            title: "❗ Be careful",
            content:
              "Are you sure you want to download this file? Malicious files can harm your phone!\n\n📁 File name: {{name}}",
            ok_text: "Download",
            cancel_text: "Cancel",
          },
        },
      },
      Message: {
        poll: "📊 Poll: {{question}}",
        toasts: {
          copied_message: "Message copied",
        },
        alerts: {
          open_link: {
            title: "⚠ Caution, this may be dangerous",
            content:
              "Are you sure you want to open this link? We cannot guarantee your safety when visiting it.\n\n{{url}}",
            ok_text: "Open link",
            cancel_text: "No",
          },
        },
        options: {
          reply: "Reply",
          copy: "Copy",
          show_original_message: "Show original message",
          translate_message: "Translate message",
          original_restored: "Original message restored.",
          already_in_lang: "The message is already in your language.",
          translated_success: "Message translated!",
          not_identified_lang: "Could not identify the language.",
          part_opt: "Participant options",
          delete: "Delete",
          report: "Report message",
        },
      },
      RecordingAudio: {
        recording: "Recording",
      },
      ReplyingMessage: {
        read_more: "Read more",
        read_less: "Read less",
        replying: "Replying to:",
        voice_message: "🎤 Voice message",
        files_one: "file",
        files_other: "files",
      },
      InviteInMessage: {
        invalid_invite_title: "🚫 Invalid invite",
        invalid_invite_subtitle:
          "The invite may have expired, been deleted, or reached its maximum usage limit!",
        invite_title: "Invite to:",
        invite_screen_title: "You were invited to the group:",
        no_desc: "No description",
        joined_text: "You have already joined!",
        join_text: "Join group",
        toasts: {
          joined: "You joined the group '{{name}}'!",
          error: "Could not use the invite",
        },
      },
      LinkPreview: {
        watch_text: "Tap here to watch",
        link_copied: "Link copied",
      },
      Typing: {
        typing_user_one: "is ",
        typing_user_other: "are ",
        typing: "typing",
        many: "Multiple users",
      },
      Poll: {
        max_options: "Maximum of {{count}} options reached.",
        min_options: "The poll must have at least {{count}} options.",
        type_poll_question: "Enter the poll question.",
        create_poll: "Create Poll",
        options: "Options",
        question_input_placeholder: "Ex: Where is the event taking place?",
        question_option_placeholder: "Option {{count}}",
        add_option: "Add option",
        multiple: "Allow multiple choices",
        question: "Question",
      },
    },
    Modals: {
      EmblemModal: {
        title: "Cool badge, right?",
        content:
          "It is awarded to very special people who support Saturn Chat with the Star plan.",
        premium_text: "Want one too? Come join the constellation!",
        be_star: "Get Star",
      },
    },
    Alert: {
      cancel: "Cancel",
    },
  },
  OnBoarding: {
    done: "Get Started",
    skip: "Skip",
    pages: {
      0: {
        title: "Welcome to Saturn Chat!",
        subtitle:
          "Here you will find a huge variety of groups (or you can create one just the way you like).",
      },
      1: {
        title: "Send messages easily!",
        subtitle:
          "With just a few clicks, you can send and receive messages with photos, videos, and even voice messages.",
      },
      2: {
        title: "You are safe!",
        subtitle:
          "Your privacy is preserved here, and your data will never be sold to anyone!",
      },
      3: {
        title: "Become a Star!",
        subtitle:
          "When you are ready, head over to settings, get the Star plan, and enjoy Saturn Chat to the fullest!",
      },
    },
  },
  Auth: {
    Home: {
      title: "Let's get started?",
      subtitle: "Log in or create an account to start using the app!",
      login: "Log in",
      new_account: "Create account",
    },
    CreateAccount: {
      header_title: "Create account",
      avatar_select_label: "Choose a profile picture",
      avatar_select_tip:
        "💡 Reminder: you must select an image of at most 5 MB.",
      avatar_selected: "🖼 This photo looks perfect!",
      register_error:
        "Could not create account. The email might already be in use; try logging in.",
      internal_error:
        "An internal server error occurred. Please try again later.",
      nickname_rules:
        "Must be a unique name containing only letters and numbers. Only hyphens (-) and underscores (_) are allowed. If no username is provided, one will be automatically generated for you.",
      searching: "Searching...",
      labels: {
        name: "Name",
        nickname: "Username",
        email: {
          label: "Email",
          error: "This email is invalid",
        },
        password: {
          label: "Enter a password",
          error: "Password does not meet security requirements",
          info: "Your password must contain at least 8 characters (including at least 1 uppercase letter), at least 1 number, and 1 symbol.",
        },
        password_again: {
          label: "Confirm your password",
          error: "Passwords do not match",
        },
      },
      register_button: "Create account",
      consent: {
        guidelines: "Community Guidelines",
        privacy_policy: "Privacy Policy",
        line_0: 'By clicking "Create account" you accept our',
        line_1: "and also our",
      },
    },
    Login: {
      header_title: "Log in",
      title: "Hello,\nWelcome back",
      login_error:
        "Could not log in. Check your credentials or create an account.",
      email: "Email",
      password: "Password",
      forgot_password: "Forgot your password?",
      login_button: "Log in",
      register_button: "New here? Create an account!",
      internal_error:
        "An internal server error occurred. Please try again later.",
    },
    ForgotPassword: {
      alerts: {
        error: "An error occurred",
        warn: "Warning",
        code_error: "An error occurred while requesting the code.",
        length_code: "Please enter the complete 6-digit code.",
        invalid_code: "Invalid or expired code.",
        reset_pass_error: "Could not reset password.",
      },
      toasts: {
        switched_password: "Password successfully changed!",
      },
      header_title: "Recover password",
      title: "Lost your password?",
      subtitle:
        "Don't worry! We will help you regain access to your account in a few minutes.",
      email_placeholder: "Email or Username",
      next_button: "Next",
      verify_code: "Verification code",
      verify_subtitle: "Enter the 6-digit code sent to {{masked}}.",
      confirm: "Confirm",
      new_pass_title: "Create a new password",
      new_pass_subtitle:
        "Your new password must be different from previously used passwords.",
      new_pass: "New password",
      pass_rules:
        "Your password must contain at least 8 characters (including at least 1 uppercase letter), at least 1 number, and 1 symbol.",
      confirm_pass: "Confirm new password",
      confirm_pass_error: "Passwords do not match.",
      switch_pass: "Change Password",
    },
  },
  TabBar: {
    groups: "Groups",
    friends: "Friends",
    new_group: "New group",
    settings: "Settings",
  },
  Home: {
    header_title: "Groups",
    quick_access: "Quick access",
    empty_list: {
      title: "How about joining a group to get started?",
      search_text: "Go to the",
      line_0: "tab and search for something, or join our",
      official_group: "Official Group",
    },
    groups_list: {
      title: "Access groups",
      subtitle_one: "You are in {{count}} group",
      subtitle_other: "You are in {{count}} groups",
    },
  },
  Friends: {
    header_title: "Friends",
    title: "Direct messages",
    subtitle:
      "Send private messages to your friends. You can only talk to people on your friends list.",
    empty_list_text: "You have no friends yet. Add new friends.",
  },
  NewGroup: {
    header_title: "New group",
    avatar_select_label: "Choose a profile picture",
    avatar_select_tip: "We recommend a 600x600 pixels image and up to 5 MB",
    avatar_selected: "🖼 This photo looks perfect!",
    limit: {
      title: "You have reached the limit of {{count}} groups!",
      subtitle:
        "This limit is set so everyone can create their communities on Saturn Chat and to prevent spam.",
      premium:
        "You can also become a Star and create up to {{groups}} groups with {{participants}} participants each.",
    },
    form: {
      labels: {
        name: {
          label: "Group name",
          placeholder: "max. 100 characters",
        },
        desc: {
          label: "Describe your group",
          placeholder: "max. 500 characters",
        },
        tags: {
          label: "Group tags",
          placeholder: "separate with commas",
        },
        public: "Public",
        private: "Private",
      },
      create_group: "Create group",
    },
    star: "Become a Star",
  },
  Settings: {
    header_title: "Settings",
    alerts: {
      sign_out: {
        title: "😥 Are you sure you want to leave?",
        subtitle:
          "By logging out, you won't receive notifications for new messages, invites, or anything related.",
        ok_text: "Log out",
        cancel_text: "Cancel",
      },
    },
    general: {
      title: "General",
      star: "Become a Star",
      manage_star: "Manage Star plan",
      edit_profile: "Edit profile",
      languages: "Languages",
      dark_theme: "Dark Mode",
      notifications: "Notifications",
    },
    account: {
      title: "Account & Privacy",
      edit_password: "Change password",
      security: {
        require_on_open: "Require password when opening the app",
        interval: "Request authentication",
        interval_title: "Request authentication",
        interval_content: "Choose when the lock should be requested.",
        unavailable_title: "Local authentication unavailable",
        unavailable_content:
          "Register a biometric or device password to enable this option.",
        unlock_prompt: "Unlock Saturn Chat",
        unlock_message: "Authenticate to open Saturn Chat",
        authenticating: "Waiting for authentication",
        unlock_button: "Unlock",
        cancel: "Cancel",
        intervals: {
          0: "Every time it opens",
          5: "Every 5 minutes",
          15: "Every 15 minutes",
          30: "Every 30 minutes",
          60: "Every hour",
        },
      },
    },
    about: {
      developer_options: "Developer Options",
      use_dev_api: "Use Developer API",
      title: "About",
      guidelines: "Community Guidelines",
      privacy_policy: "Privacy Policy",
      feedback: "Send Feedback",
    },
    sign_out: "Log out",
  },
  SendFeedback: {
    title: "Send Feedback",
    feedback_type: {
      bug: "Bugs",
      suggestion: "Suggestions",
      others: "Others",
    },
    labels: {
      message: "Message",
    },
    done: "Send",
    sent: "Feedback successfully sent!",
  },
  Search: {
    header_title: "Explore",
    input_placeholder: "What are you looking for today?",
    title: "No results at the moment",
    subtitle: "Try searching for a group name, related tag, or username.",
    loading: {
      title: "Searching...",
      subtitle: "This might take a moment",
    },
    participants_one: "participant",
    participants_other: "participants",
    filters: {
      all: "All",
      users: "Users",
      groups: "Groups",
    },
  },
  InviteManager: {
    header_title: "Invites & Requests",
    subtitle: "Manage your received group invites and friend requests.",
    empty_text:
      "There are no group invites or friend requests. Check back later.",
    toasts: {
      invite_accept: "Invite accepted!",
      invite_reject: "Invite declined :(",
      request_accept: "Friend request successfully accepted!",
      request_reject: "Friend request successfully rejected",
    },
  },
  Profile: {
    friends: "Friends",
    participating: "Participating",
  },
  EditProfile: {
    header_title: "Edit profile",
    switch_avatar: "Change avatar",
    searching: "Searching...",
    errors: {
      "400": "Username does not meet the expected standards",
      "404": "Username was not provided",
      "1000": "Could not fetch username",
      unavailable: "Username is not available",
    },
    toasts: {
      updated: "Profile updated",
      update_avatar: "Updating avatar...",
      updated_avatar: "Avatar updated",
      photo_permission:
        "We need permission to access your photos to change your avatar!",
    },
    labels: {
      nickname: "Username",
      name: {
        label: "Name",
        placeholder: "max. 100 characters",
      },
      bio: {
        label: "Bio",
        placeholder: "max. 100 characters",
      },
    },
    done: "Done",
  },
  SwitchLanguage: {
    header_title: "Languages",
    title: "Understand how languages work",
    subtitle:
      "The app language is set by your device default.\n\nTo change it, simply access your device settings and make the change; the app will update automatically.",
  },
  SwitchPassword: {
    header_title: "Change your password",
    toasts: {
      updated_pass: "Password changed successfully!",
      incorrect_pass: "Incorrect current password!",
      error_pass: "Error changing password!",
    },
    labels: {
      current_password: "Current password",
      new_password: {
        label: "New password",
        error: "Password does not meet security requirements",
        info: "Your password must contain at least 8 characters (including at least 1 uppercase letter), at least 1 number, and 1 symbol.",
      },
      confirm_pass: {
        label: "Confirm new password",
        error: "Passwords do not match",
      },
    },
    done: "Change password",
  },
  Premium: {
    header_title: "Join the constellation!",
    be_star: "Become a Star!",
    title:
      "Get amazing perks and features in Saturn Chat at an affordable price!",
    subtitle:
      "Make the most of all available features, such as sending larger files, creating more groups, removing annoying ads, and much more!",
    free_month: "Subscribe now and get 1 month free!",
    buy_button: "Get starting from {{price}}",
    vantages_title: "Perks of the Star plan:",
    advantages: {
      0: "Completely free of annoying ads!",
      1: "Increase file upload storage by {{multiple}}x: from {{default}} MB to an incredible {{premium}} MB.",
      2: "Increase the limit of groups you can create: from {{default}} to {{premium}} groups.",
      3: "Increase the participant limit for your groups: from {{default}} to {{premium}} participants.",
      4: "Increase the number of people allowed in a call: from {{default}} to {{premium}} participants.",
      5: "Get an exclusive badge next to your name to show off!",
      6: "Love sending long texts? Increase your message character limit from {{default}} to a wonderful {{premium}} characters!",
      7: "Support the development of the app and help us bring updates faster ❤",
      8: "Export your group chat messages in CSV format.",
    },
  },
  ManagePremium: {
    header_title: "Manage Star plan",
    alerts: {
      cancel_plan: {
        title: "❗ Are you sure?",
        content:
          "By cancelling your subscription, you will lose ALL benefits granted by the plan. Additionally, YOU WILL NOT RECEIVE A REFUND FOR THE ALREADY PAID MONTH (but you can use the benefits until the renewal date).",
        ok_text: "Keep plan",
        cancel_text: "Cancel plan",
      },
    },
    title: "Manage your Star plan",
    subtitle:
      "Here you can see details about your plan, such as renewal date and payment status. You can also cancel your subscription at any time here.",
    plan_labels: {
      plan: "Subscription plan:",
      status: "Subscription status",
      start: "Purchase date",
      expire: "Renewal date",
      resume: "Return date",
    },
    payments: {
      0: "Pending",
      1: "Paid",
      2: "Trial",
      3: "Plan updated",
    },
    periods: {
      0: "Monthly",
      1: "Quarterly",
      2: "Yearly",
    },
    cancel_text: "Cancel subscription",
  },
  ChoosePlan: {
    header_title: "Choose your plan",
    title: "We're almost there!",
    subtitle:
      "Now choose the plan you want, with monthly, quarterly, or yearly options.",
    monthly: "Monthly",
    quarterly: "Quarterly",
    yearly: "Yearly",
    button_text: "I want this one!",
    finished: {
      success_title: "Subscription successful!",
      error_title: "Could not complete subscription",
      success_subtitle:
        "You can now enjoy all the benefits available in the Star plan! Note that it may take a few minutes for all benefits to be fully unlocked.",
      error_subtitle:
        "Your payment may have been declined or cancelled by the app store. Check and try again later.",
    },
  },
  Call: {
    header_title: "Group Call",
    participants_count: "{{count}} in call",
    participants_modal: {
      title: "Participants",
    },
    view_all: "View all",
    floating_button: "Return to call",
    alert_ok: "Got it",
    you: "You",
    notification: {
      channel_name: "Ongoing calls",
      title: "Call in progress",
      body: "Tap to return to Saturn Chat",
    },
    events: {
      inactivity_closed: "The call was ended due to inactivity.",
      room_closed: "This call room has been closed.",
    },
    errors: {
      default: {
        title: "Could not join the call",
        content: "An error occurred while accessing the call.",
      },
      access_blocked: {
        title: "Access blocked",
        content: "You are blocked in this group and cannot join the call.",
      },
      group_invalid: {
        title: "Invalid group",
        content: "You do not belong to this group or the conversation is no longer available.",
      },
      direct_limit: {
        title: "Two-person call",
        content: "This direct call can only include the two participants in the conversation.",
      },
      participant_limit: {
        title: "Call limit",
      },
      inactivity_timeout: {
        title: "Call ended",
        content: "The call was closed due to inactivity.",
      },
      call_closed: {
        title: "Call ended",
        content: "This call room has been closed.",
      },
      direct_not_part: {
        title: "Invalid participation",
        content: "You are not part of this direct call.",
      },
    },
  },
  Chat: {
    alerts: {
      file_size: {
        title: "😱 Such a heavy file!",
        content:
          "I can't upload something this large; try sending a file up to {{amount}} MB!",
        extra_button_text: "Get Star plan",
      },
      same_file: {
        title: "🤔 I've seen this before",
        content: "You have already selected this file to be sent!",
      },
      mic_perm: {
        title: "🙂 Please",
        content:
          "I need permission to use your microphone so I can record audio.",
      },
    },
    toasts: {
      sending_voice: "Sending voice message...",
    },
    type_message: "Type your message...",
    drop_send: "Release to send",
    sent: "Sent",
    limit_char: "Limit of {{count}} characters reached!",
    no_send_message:
      " You cannot send messages in this group, but you can still view them and receive notifications.",
  },
  GroupConfig: {
    header_group_title: "Group options",
    header_chat_title: "Chat options",
    alerts: {
      delete_group: {
        title: "⚠ Caution, this is dangerous!",
        content:
          'This action is IRREVERSIBLE! Deleting the group "{{name}}" will also delete all messages, files, and everything saved in it!',
        ok_text: "Delete",
        cancel_text: "Cancel",
      },
      exit_group: {
        title: "😥 Are you sure you want to leave?",
        content:
          "Leaving the group will keep your messages, but you won't receive notifications for new messages and will need an invite to rejoin (if private).",
        ok_text: "Leave",
      },
    },
    options: {
      general: {
        title: "General",
        participants: "Participants",
        invite_users: "Invite users",
        edit_group: "Edit group",
        details: "View details",
        notify_new_participants: "Notify owner when new participants join",
        accepting_new_users: "Allow new participants to join",
        max_participants:
          "Maximum amount of participants (leave 0 for unlimited)",
        minimum_role_for_send_message:
          "Minimum role required to send messages in group",
        roles: {
          participant: "Participant",
          moderator: "Moderator",
          manager: "Manager",
          admin: "Administrator",
        },
      },
      participant: {
        send_notifications: "Receive notifications for new messages",
        title: "Participant settings",
      },
      danger_zone: {
        title: "Danger zone",
        delete_group: "Delete group",
        exit_group: "Leave group",
      },
    },
    toasts: {
      submit_success: "Settings successfully updated",
      submit_error: "Could not save changes",
    },
  },
  Participants: {
    header_title_one: "{{count}} Participant",
    header_title_other: "{{count}} Participants",
    title: "All participants",
    created: "Created on {{date}}",
    joined: "Joined on {{date}}",
    online: "Online",
    last_seen: "Last seen on {{date}}",
    owner: "Owner",
  },
  Participant: {
    title: "Participant options",
    view_profile: "View profile",
    change_role: "Change role",
    kick: "Kick",
    ban: "Ban participant",
  },
  PunishParticipant: {
    title: "Are you sure?",
    desc_kick:
      'You are about to kick participant "{{userName}}" from group "{{groupName}}". Are you sure?',
    desc_ban:
      'You are about to ban participant "{{userName}}" from group "{{groupName}}". Are you sure?',
    notify_text: "Notify participant of punishment",
    confirm_text_kick: "Yes, kick now!",
    confirm_text_ban: "Yes, ban now!",
    cancel_text: "No, I changed my mind",
    toasts: {
      success: "User successfully punished!",
      error: "Could not punish user. Try again.",
    },
  },
  ChangeRole: {
    header_title: "Change role",
    title: "Roles",
    subtitle:
      "Members with special roles can manage various group features. Grant important roles only to trusted people.",
    roles: {
      participant: {
        name: "Participant",
        desc: "This role grants no special powers to the participant.",
      },
      mod: {
        name: "Moderator",
        desc: "Moderators maintain group safety and order.",
      },
      manager: {
        name: "Manager",
        desc: "Managers help organize the group and bring in new members.",
      },
      admin: {
        name: "Administrator",
        desc: "Grants the participant full group ownership powers.",
      },
    },
    permissions: {
      create_invites: "Create invites to invite new users",
      punish_members: "Punish participants breaking rules",
      manage_roles: "Manage roles",
      manage_messages: "Manage messages (like deleting them)",
      edit_group: "Edit group info (name, avatar, description)",
      delete_group: "Delete group",
    },
    toasts: {
      success: "User role updated successfully!",
      error: "Error updating role. Try again.",
    },
  },
  FriendsManager: {
    alerts: {
      unfriend: {
        title: "⚠️ Unfriend user?",
        content:
          "If you remove this user from your friends list, you can no longer exchange direct messages. All existing direct messages will be deleted for both.",
        ok_text: "Unfriend",
      },
    },
    header_title: "Manage friends",
  },
  InviteUsers: {
    header_title: "Invite",
    empty_title: "No friends to invite. Try sharing an invite via link.",
    title: "Group invites",
    subtitle: "Create and manage all group invites using our manager.",
    new_invite_text: "Manage invites",
    friends_invite_title: "Invite your friends",
    friends_invite_subtitle:
      "Only friends not currently in the group appear here.",
    invite: "Invite",
    invited: "Invited",
    toasts: {
      success: "Invite sent successfully!",
      error: "Could not invite your friend!",
    },
  },
  NewInvites: {
    header_title: "Create invites",
    title: "Generate invite",
    subtitle: "You can generate invites with these settings:",
    permanent: "Permanent invite",
    usage_unlimited: "Unlimited uses",
    usage_one: "Use up to {{count}} time",
    usage_other: "Use up to {{count}} times",
    expire_one: "Expire in {{count}} day",
    expire_other: "Expire in {{count}} days",
    day_one: "Day",
    day_other: "Days",
    active_invites: "Active invites",
    generate: "Generate",
    expire_in: "Expires in ",
    usage_amount_one: "Used {{count}} time out of ",
    usage_amount_other: "Used {{count}} times out of ",
    toasts: {
      error_create: "Could not create invite.",
      success_create: "Invite created successfully!",
      error_remove: "Could not remove invite.",
      success_remove: "Invite removed successfully!",
      copy_invite: "Invite copied!",
    },
  },
  EditGroup: {
    toasts: {
      success: "Group edited successfully!",
      avatar_permission: "Permission required to access photos!",
      updating: "Updating avatar...",
      updated: "Avatar updated",
    },
    header_title: "Edit group",
    switch_avatar: "Change avatar",
    inputs: {
      name: "Name",
      desc: "Description",
      public: "Make public",
    },
    done: "Done",
  },
  GroupInfos: {
    join: "Join",
    joined: "Joined",
    participants_one: "Participant",
    participants_other: "Participants",
    tags: "Group tags",
    desc: "Description",
    no_desc: "This group does not have a description.",
    no_tags: "No tags defined",
    accepting_participants_text:
      "This group reached the maximum participant capacity.",
    toasts: {
      error: "Could not join group!",
    },
  },
  Report: {
    header_title: "Report",
    title: "Submit report",
    subtitle:
      "Found something inappropriate? Submit a report so we can review it anonymously.",
    types: {
      SPAM: "Spam and/or unwanted messages",
      VIOLENCE:
        "Violent practices, encouragement of suicide, or display of firearms",
      SEXUAL: "Sexual content, pedophilia, or child abuse",
      BULLYING: "Bullying or disrespect towards other users",
      RACISM: "Hate speech, racism, xenophobia, and similar",
      SCAM: "Scams, fake giveaways, extortion, and similar",
      FAKE_ACCOUNT: "Fake content or trying to impersonate another person",
      DMCA: "Copyrighted content",
      OTHER: "Other",
    },
    done: "Report",
    sent: "Report successfully submitted!",
  },
};
