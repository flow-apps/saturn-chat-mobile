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
      reject: "Reject",
    },
    AddFriendButton: {
      friends: "Friends",
      requested: "Request sent",
      request: "Add to friends",
    },
    Chat: {
      AudioPlayer: {},
      FilePreview: {
        alerts: {
          download: {
            title: "❗ Be very careful",
            content: "Are you sure you want to download the file? Malicious files can damage your phone!\n\n📁 File name: {{name}}",
            ok_text: "Download",
            cancel_text: "Cancel" 
          }
        }
      },
      CurrentReplyingMessage: {
        file_amount: "file",
        file_amount_plural: "files",
        replying_text: "You are replying:"
      },
      Message: {
        toasts: {
          copied_message: "Copied message"
        },
        alerts: {
          open_link: {
            title: "⚠ Be careful, it can be dangerous",
            content: "Are you sure you want to access this link? We cannot guarantee your security when accessing it.\n\n{{url}}",
            ok_text: "Access",
            cancel_text: "No"
          }
        },
        options: {
          reply: "Reply",
          copy: "Copy",
          part_opt: "Participant Options",
          delete: "Delete"
        }
      },
      RecordingAudio: {
        recording: "Recording"
      },
      ReplyingMessage: {
        read_more: "Read more",
        read_less: "Read less",
        replying: "Replying:",
        voice_message: "🎤 Voice message",
        files: "file",
        files_plural: "files"
      },
      InviteInMessage: {
        invalid_invite_title: "🚫 Invalid Invite",
        invalid_invite_subtitle: "The invite may have expired, been deleted or reached the maximum number of uses!",
        invite_title: "Invite to:",
        no_desc: "No description",
        joined_text: "You're already in!",
        join_text: "Join the group",
        toasts: {
          joined: "You've joined the '{{name}}' group!",
          error: "Unable to use invite"
        }
      },
      LinkPreview: {
        watch_text: "Toque aqui para assistir",
        link_copied: "Link copied"
      },
      Typing: {
        typing_user: "is ",
        typing_user_plural: "are ",
        typing: "typing",
        many: "Many users"
      }
    },
    Modals: {
      EmblemModal: {
        title: "Cool emblem, right?",
        content: "It is given to very special people who support Saturn Chat with the Star plan.",
        premium_text: "Do you want to have one like it? So come and be part of the constellation!",
        be_star: "Get Star"
      }
    },
    Alert: {
      cancel: "Cancel"
    }
  },
  OnBoarding: {
    done: "Done",
    skip: "Skip",
    pages: {
      0: {
        title: "Welcome to Saturn Chat!",
        subtitle:
          "Here you will find a most variety of groups (or create one in your own way).",
      },
      1: {
        title: "Send messages with ease!",
        subtitle:
          "With just a few clicks you can send and receive messages with photos, videos and even voice messages.",
      },
      2: {
        title: "You're safe!",
        subtitle:
          "Here your privacy is preserved, your data will not be sold to nobody!",
      },
      3: {
        title: "Be a Star!",
        subtitle:
          "When you're ready, go to the settings menu and get the Star plan and enjoy the Saturn Chat!",
      },
    },
  },
  Auth: {
    Home: {
      title: "Let's start?",
      subtitle: "Access or create your account to start using the app!",
      login: "Login",
      new_account: "Create account",
    },
    CreateAccount: {
      header_title: "Create account",
      avatar_select_label: "Choose a profile photo",
      avatar_select_tip:
        "💡 Remember: You must select an image with a maximum of 5MB.",
      avatar_selected: "🖼 This photo is perfect!",
      register_error:
        "Unable to create account, email may already be in use, try logging in",
      labels: {
        name: "Name",
        email: {
          label: "E-mail",
          error: "This email is not valid",
        },
        password: {
          label: "Enter a password",
          error: "The password does not meet security standards",
          info: "Your password must contain: at least 8 characters (with least 1 capital letter), at least 1 number and at least 1 symbol",
        },
        password_again: {
          label: "Confirm your password",
          error: "The passwords do not match",
        },
      },
      register_button: "Create account",
      consent: {
        guidelines: "Community Guidelines",
        privacy_policy: "Privacy Policy",
        line_0: 'On click in "Create account" you accept our',
        line_1: "and also our",
      },
    },
    Login: {
      header_title: "Log in",
      title: "Hello,\nWelcome back",
      login_error: "Unable to log in, check your login or create an account",
      email: "E-mail",
      password: "Password",
      forgot_password: "Forgot your password?",
      login_button: "Login",
      register_button: "Are you new here? Create an account!",
    },
  },
  TabBar: {
    groups: "Groups",
    friends: "Friends",
    new_group: "New Group",
    settings: "Settings",
  },
  Home: {
    header_title: "Groups",
    quick_access: "Quick access",
    empty_list: {
      title: "How about starting by joining a group?",
      search_text: "Access the tab",
      line_0: "and search for something or join our",
      official_group: "Official Group",
    },
    groups_list: {
      title: "Access groups",
      subtitle: "You are in {{count}} group",
      subtitle_plural: "You are in {{count}} groups",
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
    header_title: "New Group",
    avatar_select_label: "Choose a profile photo",
    avatar_select_tip: "We recommend a 600x600 image and a maximum of 5MB",
    avatar_selected: "🖼 This photo is perfect!",
    limit: {
      title: "You have reached the {{count}} group limit!",
      subtitle:
        "This limit is set so that everyone can create their communities on Saturn Chat and also to avoid annoying problems like spam.",
      premium:
        "You can also become a Star and create up to {{groups}} groups with {{participants}} participants in each",
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
          placeholder: "separate by comma",
        },
        public: "Public",
        private: "Private",
      },
      create_group: "Create group",
    },
    star: "Becoming a Star",
  },
  Settings: {
    header_title: "Settings",
    alerts: {
      sign_out: {
        title: "😥 Do you really want to leave your account?",
        subtitle:
          "When you sign out you will not receive notifications of new messages, invites or anything related.",
        ok_text: "Sign out",
        cancel_text: "Cancel",
      },
    },
    general: {
      title: "General",
      star: "Be a Star",
      edit_profile: "Edit profile",
      languages: "Languages",
      dark_theme: "Dark Mode",
      notifications: "Notifications",
    },
    account: {
      title: "Account and privacy",
      edit_password: "Change Password",
    },
    about: {
      title: "About",
      guidelines: "Community Guidelines",
      privacy_policy: "Privacy Policy",
    },
    sign_out: "Sign out",
  },
  Search: {
    header_title: "Explorer",
    input_placeholder: "What are you looking for today?",
    title: "No results at the moment",
    subtitle: "Try searching for the name of a group or tag related to it",
    loading: {
      title: "Searching for groups...",
      subtitle: "This may take a while",
    },
    participants: "participant",
    participants_plural: "participants",
  },
  InviteManager: {
    header_title: "Invites and requests",
    subtitle:
      "Manage your Invites and friend requests that you have received.",
    empty_text:
      "There are no group invites or friend requests. Come back later.",
    toasts: {
      invite_accept: "Invite accepted!",
      invite_reject: "Invite rejected :(",
      request_accept: "Request accepted successfully!",
      request_reject: "Request successfully rejected",
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
      updated: "User updated",
      update_avatar: "Updating avatar...",
      updated_avatar: "Updated Avatar",
      photo_permission:
        "We need permission to access your photos to change your avatar!",
    },
    labels: {
      name: {
        label: "Name",
        placeholder: "max. 100 characters",
      },
      bio: {
        label: "Message",
        placeholder: "max. 100 characters",
      },
    },
    done: "Done",
  },
  SwitchLanguage: {
    header_title: "Languages",
    title: "Understand how languages ​​work",
    subtitle:
      "The application language is set using the device's default language.\n\nTo change the language, simply go to the device settings and change the language, and the application will automatically change the language.",
  },
  SwitchPassword: {
    header_title: "Change your password",
    toasts: {
      updated_pass: "Password changed successfully!",
      incorrect_pass: "Incorrect old password!",
      error_pass: "Error changing password!",
    },
    labels: {
      current_password: "Old password",
      new_password: {
        label: "New password",
        error: "The password does not meet security standards",
        info: "Your password must contain: at least 8 characters (at least 1 capital letter), at least 1 number and at least 1 symbol",
      },
      confirm_pass: {
        label: "Confirm new password",
        error: "The passwords do not match",
      },
    },
    done: "Change Password",
  },
  Premium: {
    header_title: "Be part of the Constellation!",
    be_star: "Be a Star!",
    title: "Get amazing Saturn Chat features for a low cost!",
    subtitle:
      "Make the most of all available resources such as sending bigger files, create more groups, remove all annoying ads, and more!",
    free_month: "Subscribe now and get 1 month free!",
    buy_button: "Get from {{price}}",
    vantages_title: "Advantages of the Star plan:",
    advantages: {
      0: "Totally boring ads free!",
      1: "Increase the space for uploading files by {{multiple}}x, from {{default}}MB to an incredible {{premium}}MB.",
      2: "Increase the number of groups you can create from {{default}} to {{premium}} groups.",
      3: "Increase the amount of participants you can have in your groups from {{default}} to {{premium}} participants.",
      4: "Get an exclusive badge next to your name!",
      5: "Do you like sending big texts? So increase your messages from {{default}} characters to wonderful {{premium}} characters!",
      6: "Supports app development and brings many features quickly ❤",
      7: "Export your group messages in CSV format.",
    },
  },
  ChoosePlan: {
    header_title: "Choose your plan",
    title: "We are almost there!",
    subtitle:
      "Now you must choose which plan you want, being able to choose between monthly, quarterly or annual plans.\n\nRemember, if it's your first subscription you get 1 month free!",
    monthly: "Monthly",
    quarterly: "Quarterly",
    yearly: "Yearly",
    button_text: "I want this!",
  },
  Chat: {
    alerts: {
      file_size: {
        title: "😱 So heavy!",
        content:
          "I can't carry something that heavy, try something up to {{amount}}MB!",
        extra_button_text: "Get Star plan",
      },
      same_file: {
        title: "🤔 I've seen this before",
        content: "You have already chosen this file to be sent!",
      },
      mic_perm: {
        title: "🙂 Please",
        content:
          "I need permission to use your microphone so i can record audio",
      },
    },
    toasts: {
      sending_voice: "Sending voice message...",
    },
    type_message: "Type your message...",
    drop_send: "Drop to send",
    sent: "sent",
    limit_char: "Limite de {{count}} caracteres atingido!"
  },
  GroupConfig: {
    header_group_title: "Group options",
    header_chat_title: "Chat options",
    alerts: {
      delete_group: {
        title: "⚠ Be careful, this is dangerous!",
        content: "This action is IRREVERSIBLE! By deleting the \"{{name}}\" group you will also be deleting all messages, files and anything else you are keeping in that group!",
        ok_text: "Delete",
        cancel_text: "Cancel"
      },
      exit_group: {
        title: "😥 Are you sure you want to leave?",
        content: "When leaving the group, your messages will be maintained, however, you will not receive notifications of new messages and will need to be invited to rejoin the group (if it is private)!",
        ok_text: "Leave"
      }
    },
    options: {
      general: {
        title: "General",
        participants: "Participants",
        invite_users: "Invite users",
        edit_group: "Edit group",
        details: "View details"
      },
      danger_zone: {
        title: "Danger zone",
        delete_group: "Delete group",
        exit_group: "Leave the group",
      }
    }
  },
  Participants: {
    header_title: "{{count}} Participant",
    header_title_plural: "{{count}} Participants",
    title: "All participants",
    created: "Created on {{date}}",
    joined: "Joined on {{date}}",
    owner: "Owner"
  },
  Participant: {
    title: "Participant options",
    view_profile: "View profile",
    change_role: "Change role",
    kick: "Kick",
    ban: "Ban participant"
  },
  PunishParticipant: {
    title: "Are you sure about that?",
    desc_kick: "You are about to kick the participant \"{userName}\" from the group \"{groupName}\". Are you sure of your choice?",
    desc_ban: "You are about to ban participant \"{userName}\" from the group \"{groupName}\". Are you sure of your choice?",
    notify_text: "Notify participant of punishment",
    confirm_text_kick: "Yes, kick out now!",
    confirm_text_ban: "Yes, ban now!",
    cancel_text: "No, I changed my mind"
  }
};
