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
      ReplyingMessage: {
        file_amount_one: "file",
        file_amount_other: "files",
        replying_text: "You are replying:"
      },
      FilePreview: {},
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
      }
    },
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
      subtitle: "You are in {{count}} groups",
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
          "When you sign out you will not receive notifications of new messages, invitations or anything related.",
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
    participants: "participants",
  },
  InviteManager: {
    header_title: "Invitations and requests",
    subtitle:
      "Manage your invitations and friend requests that you have received.",
    empty_text:
      "There are no group invites or friend requests. Come back later.",
    toasts: {
      invite_accept: "Invitation accepted!",
      invite_reject: "Invitation rejected :(",
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
  },
};
