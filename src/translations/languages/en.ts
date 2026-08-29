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
      },
      FilePreview: {
        alerts: {
          download: {
            title: "❗ Be very careful",
            content:
              "Are you sure you want to download this file? Malicious files can damage your phone!\n\n📁 File name: {{name}}",
            ok_text: "Download",
            cancel_text: "Cancel",
          },
        },
      },
      Message: {
        toasts: {
          copied_message: "Message copied",
        },
        alerts: {
          open_link: {
            title: "⚠ Caution, this could be dangerous",
            content:
              "Are you sure you want to open this link? We cannot guarantee your safety when accessing it.\n\n{{url}}",
            ok_text: "Open",
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
          "The invite may have expired, been deleted, or reached its maximum uses!",
        invite_title: "Invite for:",
        invite_screen_title: "You have been invited to the group:",
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
        many: "Several users",
      },
    },
    Modals: {
      EmblemModal: {
        title: "Cool badge, right?",
        content:
          "It is given to very special people who support Saturn Chat with the Star plan.",
        premium_text: "Want one too? Come join the constellation!",
        be_star: "Get Star",
      },
    },
    Alert: {
      cancel: "Cancel",
    },
  },
  OnBoarding: {
    done: "Get started",
    skip: "Skip",
    pages: {
      0: {
        title: "Welcome to Saturn Chat!",
        subtitle:
          "Here you will find a huge variety of groups (or you can create one exactly how you want it).",
      },
      1: {
        title: "Send messages easily!",
        subtitle:
          "With just a few clicks you can send and receive messages with photos, videos, and even voice messages.",
      },
      2: {
        title: "You are safe!",
        subtitle:
          "Here your privacy is preserved and your data will not be sold to anyone!",
      },
      3: {
        title: "Be a Star!",
        subtitle:
          "When you are ready, go to the settings menu, get the Star plan, and make the most out of Saturn Chat!",
      },
    },
  },
  Auth: {
    Home: {
      title: "Shall we start?",
      subtitle: "Log in or create your account to start using the app!",
      login: "Log in",
      new_account: "Create account",
    },
    CreateAccount: {
      header_title: "Create account",
      avatar_select_label: "Choose a profile picture",
      avatar_select_tip: "💡 Reminder: You must select an image of max 5 MB.",
      avatar_selected: "🖼 This photo is perfect!",
      register_error:
        "Could not create the account. The email may already be in use; try logging in.",
      labels: {
        name: "Name",
        email: {
          label: "Email",
          error: "This email is invalid",
        },
        password: {
          label: "Enter a password",
          error: "The password does not meet security standards",
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
        line_1: "as well as our",
      },
    },
    Login: {
      header_title: "Log in",
      title: "Hello,\nWelcome back",
      login_error: "Could not log in. Check your details or create an account.",
      email: "Email",
      password: "Password",
      forgot_password: "Forgot your password?",
      login_button: "Log in",
      register_button: "New here? Create an account!",
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
      title: "How about starting by joining a group?",
      search_text: "Go to the",
      line_0: "tab and search for something or join our",
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
    empty_list_text: "You don't have any friends. Add new friends.",
  },
  NewGroup: {
    header_title: "New group",
    avatar_select_label: "Choose a profile picture",
    avatar_select_tip: "We recommend a 600x600 pixels image of max 5 MB",
    avatar_selected: "🖼 This photo is perfect!",
    limit: {
      title: "You have reached the limit of {{count}} groups!",
      subtitle:
        "This limit is set so everyone can create their communities on Saturn Chat and also to avoid issues like spam.",
      premium:
        "You can also become a Star and create up to {{groups}} groups with {{participants}} participants in each.",
    },
    form: {
      labels: {
        name: {
          label: "Group name",
          placeholder: "max 100 characters",
        },
        desc: {
          label: "Describe your group",
          placeholder: "max 500 characters",
        },
        tags: {
          label: "Group tags",
          placeholder: "separate by comma",
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
        title: "😥 Are you sure you want to sign out?",
        subtitle:
          "By signing out, you will not receive notifications for new messages, invites, or anything related.",
        ok_text: "Sign out",
        cancel_text: "Cancel",
      },
    },
    general: {
      title: "General",
      star: "Be a Star",
      manage_star: "Manage Star plan",
      edit_profile: "Edit profile",
      languages: "Languages",
      dark_theme: "Dark Mode",
      notifications: "Notifications",
    },
    account: {
      title: "Account and privacy",
      edit_password: "Change password",
    },
    about: {
      developer_options: "Developer Options",
      use_dev_api: "Use Development API",
      title: "About",
      guidelines: "Community Guidelines",
      privacy_policy: "Privacy Policy",
      feedback: "Send Feedback",
    },
    sign_out: "Sign out",
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
    title: "No results right now",
    subtitle: "Try searching for a group name, a related tag, or a username.",
    loading: {
      title: "Searching...",
      subtitle: "This might take a while",
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
    header_title: "Invites and requests",
    subtitle: "Manage the invites and friend requests you have received.",
    empty_text: "No group invites or friend requests. Come back later.",
    toasts: {
      invite_accept: "Invite accepted!",
      invite_reject: "Invite declined :(",
      request_accept: "Request accepted successfully!",
      request_reject: "Request declined successfully",
    },
  },
  Profile: {
    friends: "Friends",
    participating: "Participating",
  },
  EditProfile: {
    header_title: "Edit profile",
    switch_avatar: "Change avatar",
    toasts: {
      updated: "Profile updated",
      update_avatar: "Updating avatar...",
      updated_avatar: "Avatar updated",
      photo_permission:
        "We need permission to access your photos to change your avatar!",
    },
    labels: {
      name: {
        label: "Name",
        placeholder: "max 100 characters",
      },
      bio: {
        label: "About",
        placeholder: "max 100 characters",
      },
    },
    done: "Done",
  },
  SwitchLanguage: {
    header_title: "Languages",
    title: "Understand how languages work",
    subtitle:
      "The app's language is set by your device's default language.\n\nTo change it, just go to your device settings and change the language; the app will update automatically.",
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
        error: "The password does not meet security standards",
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
    be_star: "Be a Star!",
    title:
      "Get amazing perks and features on Saturn Chat for an affordable price!",
    subtitle:
      "Make the most of all available features, like sending larger files, creating more groups, removing annoying ads, and much more!",
    free_month: "Subscribe now and get 1 month free!",
    buy_button: "Get from {{price}}",
    vantages_title: "Star plan benefits:",
    advantages: {
      0: "Completely free of annoying ads!",
      1: "Increase file upload size by {{multiple}}x: from {{default}} MB to an incredible {{premium}} MB.",
      2: "Increase the number of groups you can create: from {{default}} to {{premium}} groups.",
      3: "Increase the number of participants you can have in your groups: from {{default}} to {{premium}} participants.",
      4: "Get an exclusive badge next to your name to show off!",
      5: "Like sending long texts? Increase your message limit from {{default}} to a wonderful {{premium}} characters!",
      6: "Support the app's development and help us bring new features faster ❤",
      7: "Export your group messages in CSV format.",
    },
  },
  ManagePremium: {
    header_title: "Manage Star plan",
    alerts: {
      cancel_plan: {
        title: "❗ Are you sure?",
        content:
          "By canceling your subscription, you lose ALL benefits granted by the plan. Also, you WILL NOT RECEIVE A REFUND FOR THE ALREADY PAID MONTH (but you can use the benefits until the renewal date).",
        ok_text: "Keep plan",
        cancel_text: "Cancel plan",
      },
    },
    title: "Manage your Star plan",
    subtitle:
      "Here you can see details about your plan, such as the renewal date and payment status. You can also cancel your subscription at any time here.",
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
    title: "We are almost there!",
    subtitle:
      "Now you must choose which plan you want. You can opt between monthly, quarterly, or yearly.",
    monthly: "Monthly",
    quarterly: "Quarterly",
    yearly: "Yearly",
    button_text: "I want this one!",
  },
  Chat: {
    alerts: {
      file_size: {
        title: "😱 That's heavy!",
        content:
          "I can't load something that big; try sending a file up to {{amount}} MB!",
        extra_button_text: "Get Star plan",
      },
      same_file: {
        title: "🤔 I've seen this before",
        content: "You have already chosen this file to be sent!",
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
    drop_send: "Drop to send",
    sent: "Sent",
    limit_char: "Limit of {{count}} characters reached!",
  },
  GroupConfig: {
    header_group_title: "Group options",
    header_chat_title: "Chat options",
    alerts: {
      delete_group: {
        title: "⚠ Careful, this is dangerous!",
        content:
          'This action is IRREVERSIBLE! By deleting the group "{{name}}", you will also delete all messages, files, and anything else saved in it!',
        ok_text: "Delete",
        cancel_text: "Cancel",
      },
      exit_group: {
        title: "😥 Are you sure you want to leave?",
        content:
          "By leaving the group, your messages will be kept, but you will not receive notifications for new messages and will need to be invited again to join (if the group is private).",
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
        notify_new_participants:
          "Notify the owner when new participants join the group",
        accepting_new_users: "Accept new participants joining",
        max_participants:
          "Maximum amount of participants (leave at 0 for unlimited)",
        minimum_role_for_send_message:
          "Minimum role to send messages in the group (roles below the selected one will not be able to send messages)",
        roles: {
          participant: "Participant",
          moderator: "Moderator",
          manager: "Manager",
          admin: "Admin",
        },
      },
      participant: {
        send_notifications: "Receive new message notifications",
      },
      danger_zone: {
        title: "Danger zone",
        delete_group: "Delete group",
        exit_group: "Leave group",
      },
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
      'You are about to kick the participant "{{userName}}" from the group "{{groupName}}". Are you sure of your choice?',
    desc_ban:
      'You are about to ban the participant "{{userName}}" from the group "{{groupName}}". Are you sure of your choice?',
    notify_text: "Notify participant of punishment",
    confirm_text_kick: "Yes, kick now!",
    confirm_text_ban: "Yes, ban now!",
    cancel_text: "No, I changed my mind",
    toasts: {
      success: "User successfully punished!",
      error: "Could not punish the user. Try again.",
    },
  },
  ChangeRole: {
    header_title: "Change role",
    title: "Roles",
    subtitle:
      "Members with special roles can have control over various group features (like managing roles and invites, editing, etc.). Give important roles only to people you trust.",
    roles: {
      participant: {
        name: "Participant",
        desc: "This role gives no special powers to the participant.",
      },
      mod: {
        name: "Moderator",
        desc: "Moderators are the ones who take care of the group's safety.",
      },
      manager: {
        name: "Manager",
        desc: "Managers help organize the group and bring in new users.",
      },
      admin: {
        name: "Admin",
        desc: "Allows the participant to have the same powers as the group owner.",
      },
    },
    permissions: {
      create_invites: "Create invites to call new users",
      punish_members: "Punish participants who break the rules",
      manage_roles: "Manage roles",
      manage_messages: "Manage messages (like deleting them)",
      edit_group: "Edit group info (name, avatar, and description)",
      delete_group: "Delete the group",
    },
    toasts: {
      success: "User role successfully changed!",
      error: "Error changing role. Try again.",
    },
  },
  FriendsManager: {
    alerts: {
      unfriend: {
        title: "⚠️ Do you want to unfriend?",
        content:
          "If you remove this user from your friends list, you will no longer be able to exchange direct messages with them. All messages between you will be deleted for both.",
        ok_text: "Unfriend",
      },
    },
    header_title: "Manage friends",
  },
  InviteUsers: {
    header_title: "Invite",
    empty_title: "No friends to invite. Try sharing an invite via links.",
    title: "Group invites",
    subtitle: "Create and manage all group invites through our manager.",
    new_invite_text: "Manage invites",
    friends_invite_title: "Invite your friends",
    friends_invite_subtitle:
      "Only friends who are not in the group appear here. They will need to accept the invite to join.",
    invite: "Invite",
    invited: "Invited",
    toasts: {
      success: "Invite successfully sent!",
      error: "Could not invite your friend!",
    },
  },
  NewInvites: {
    header_title: "Create invites",
    title: "Generate invite",
    subtitle: "You can generate invites with these settings:",
    permanent: "Permanent invite",
    usage_unlimited: "Unlimited uses",
    usage_one: "Use at most {{count}} time",
    usage_other: "Use at most {{count}} times",
    expire_one: "Expire in {{count}} day",
    expire_other: "Expire in {{count}} days",
    day: "Day",
    day_plural: "Days",
    active_invites: "Active invites",
    generate: "Generate",
    expire_in: "Expires in ",
    usage_amount_one: "Has been used {{count}} time out of ",
    usage_amount_other: "Has been used {{count}} times out of ",
  },
  EditGroup: {
    toasts: {
      success: "Group successfully edited!",
      avatar_permission: "We need permission to access your photos!",
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
      "This group has reached the maximum number of participants.",
    toasts: {
      error: "Could not join the group!",
    },
  },
  Report: {
    header_title: "Report",
    title: "Make your report",
    subtitle:
      "Found something that doesn't seem right? Make your report so we can analyze the situation and take the appropriate measures. Don't worry, your report is completely anonymous.",
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
      OTHER: "Others",
    },
    done: "Report",
    sent: "Report successfully sent!",
  },
};
