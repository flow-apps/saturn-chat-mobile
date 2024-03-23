export const en = {
  Components: {
    Ads: {
      remove_ad: "Remove ad",
    },
    GroupInvite: {
      participants: "participants",
      join: "Join"
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
      edit_password: "Change Password"
    },
    about: {
      title: "About",
      guidelines: "Community Guidelines",
      privacy_policy: "Privacy Policy",
    },
    sign_out: "Sign out"
  },
  Search: {
    header_title: "Explorer",
    input_placeholder: "What are you looking for today?",
    title: "No results at the moment",
    subtitle: "Try searching for the name of a group or tag related to it",
    loading: {
      title: "Searching for groups...",
      subtitle: "This may take a while"
    },
    participants: "participants"
  },
  InviteManager: {
    header_title: "Invitations and requests",
    subtitle: "Manage your invitations and friend requests that you have received.",
    empty_text: "There are no group invites or friend requests. Come back later.",
    toasts: {
      invite_accept: "Invitation accepted!",
      invite_reject: "Invitation rejected :(",
      request_accept: "Request accepted successfully!",
      request_reject: "Request successfully rejected"
    }
  }
};
