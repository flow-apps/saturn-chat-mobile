export const fr = {
  Components: {
    Ads: {
      remove_ad: "Supprimer la publicité",
    },
    GroupInvite: {
      participants: "participants",
      join: "Rejoindre",
    },
    FriendActionButtons: {
      title: "souhaite devenir votre ami",
      accept: "Accepter",
      reject: "Refuser",
    },
    AddFriendButton: {
      friends: "Amis",
      requested: "Demande envoyée",
      request: "Ajouter en ami",
    },
    Chat: {
      AudioPlayer: {},
      CurrentReplyingMessage: {
        file_amount_one: "fichier",
        file_amount_other: "fichiers",
        replying_text: "Vous répondez à :",
        voice_message: "Message vocal",
      },
      FilePreview: {
        alerts: {
          download: {
            title: "❗ Soyez prudent",
            content:
              "Voulez-vous vraiment télécharger ce fichier ? Les fichiers malveillants peuvent endommager votre téléphone !\n\n📁 Nom du fichier : {{name}}",
            ok_text: "Télécharger",
            cancel_text: "Annuler",
          },
        },
      },
      Message: {
        poll: "📊 Sondage : {{question}}",
        toasts: {
          copied_message: "Message copié",
        },
        alerts: {
          open_link: {
            title: "⚠ Attention, cela peut être dangereux",
            content:
              "Voulez-vous vraiment ouvrir ce lien ? Nous ne pouvons pas garantir votre sécurité en le visitant.\n\n{{url}}",
            ok_text: "Ouvrir",
            cancel_text: "Non",
          },
        },
        options: {
          reply: "Répondre",
          copy: "Copier",
          show_original_message: "Afficher le message d'origine",
          translate_message: "Traduire le message",
          original_restored: "Message d'origine restauré.",
          already_in_lang: "Le message est déjà dans votre langue.",
          translated_success: "Message traduit !",
          not_identified_lang: "Impossible d'identifier la langue.",
          part_opt: "Options du participant",
          delete: "Supprimer",
          report: "Signaler le message",
        },
      },
      RecordingAudio: {
        recording: "Enregistrement",
      },
      ReplyingMessage: {
        read_more: "Lire la suite",
        read_less: "Lire moins",
        replying: "En réponse à :",
        voice_message: "🎤 Message vocal",
        files_one: "fichier",
        files_other: "fichiers",
      },
      InviteInMessage: {
        invalid_invite_title: "🚫 Invitation invalide",
        invalid_invite_subtitle:
          "L'invitation a peut-être expiré, été supprimée ou atteint sa limite d'utilisation !",
        invite_title: "Invitation pour :",
        invite_screen_title: "Vous avez été invité(e) à rejoindre le groupe :",
        no_desc: "Aucune description",
        joined_text: "Vous avez déjà rejoint !",
        join_text: "Rejoindre le groupe",
        toasts: {
          joined: "Vous avez rejoint le groupe '{{name}}' !",
          error: "Impossible d'utiliser l'invitation",
        },
      },
      LinkPreview: {
        watch_text: "Appuyez ici pour regarder",
        link_copied: "Lien copié",
      },
      Typing: {
        typing_user_one: "est en train d'",
        typing_user_other: "sont en train d'",
        typing: "écrire",
        many: "Plusieurs utilisateurs",
      },
      Poll: {
        max_options: "Limite maximale de {{count}} options atteinte.",
        min_options: "Le sondage doit comporter au moins {{count}} options.",
        type_poll_question: "Saisissez la question du sondage.",
        create_poll: "Créer un sondage",
        options: "Options",
        question_input_placeholder: "Ex : Où se déroule l'événement ?",
        question_option_placeholder: "Option {{count}}",
        add_option: "Ajouter une option",
        multiple: "Autoriser le choix multiple",
        question: "Question",
      },
    },
    Modals: {
      EmblemModal: {
        title: "Un badge sympa, non ?",
        content:
          "Il est attribué aux personnes très spéciales qui soutiennent Saturn Chat avec le forfait Star.",
        premium_text:
          "Vous en voulez un aussi ? Rejoignez la constellation !",
        be_star: "Obtenir Star",
      },
    },
    Alert: {
      cancel: "Annuler",
    },
  },
  OnBoarding: {
    done: "Commencer",
    skip: "Passer",
    pages: {
      0: {
        title: "Bienvenue sur Saturn Chat !",
        subtitle:
          "Vous trouverez ici une grande variété de groupes (ou vous pourrez en créer un selon vos envies).",
      },
      1: {
        title: "Envoyez des messages facilement !",
        subtitle:
          "En quelques clics, envoyez et recevez des messages avec des photos, des vidéos et des messages vocaux.",
      },
      2: {
        title: "Vous êtes en sécurité !",
        subtitle:
          "Votre vie privée est préservée ici et vos données ne seront jamais vendues !",
      },
      3: {
        title: "Devenez une Star !",
        subtitle:
          "Lorsque vous êtes prêt, allez dans les paramètres, optez pour le forfait Star et profitez pleinement de Saturn Chat !",
      },
    },
  },
  Auth: {
    Home: {
      title: "On commence ?",
      subtitle:
        "Connectez-vous ou créez un compte pour commencer à utiliser l'application !",
      login: "Se connecter",
      new_account: "Créer un compte",
    },
    CreateAccount: {
      header_title: "Créer un compte",
      avatar_select_label: "Choisissez une photo de profil",
      avatar_select_tip:
        "💡 Rappel : la taille maximale de l'image est de 5 Mo.",
      avatar_selected: "🖼 Cette photo est parfaite !",
      register_error:
        "Impossible de créer le compte. L'adresse e-mail est peut-être déjà utilisée ; essayez de vous connecter.",
      internal_error:
        "Une erreur interne du serveur est survenue. Réessayez plus tard.",
      nickname_rules:
        "Il doit s'agir d'un nom unique ne contenant que des lettres et des chiffres. Seuls les tirets (-) et tirets bas (_) sont autorisés. Si aucun nom d'utilisateur n'est fourni, un nom sera généré automatiquement.",
      searching: "Recherche...",
      labels: {
        name: "Nom",
        nickname: "Nom d'utilisateur",
        email: {
          label: "E-mail",
          error: "Cet e-mail est invalide",
        },
        password: {
          label: "Saisissez un mot de passe",
          error: "Le mot de passe ne respecte pas les critères de sécurité",
          info: "Votre mot de passe doit contenir au moins 8 caractères (dont au moins 1 majuscule), au moins 1 chiffre et 1 symbole.",
        },
        password_again: {
          label: "Confirmez votre mot de passe",
          error: "Les mots de passe ne correspondent pas",
        },
      },
      register_button: "Créer un compte",
      consent: {
        guidelines: "Règles de la communauté",
        privacy_policy: "Politique de confidentialité",
        line_0: 'En cliquant sur "Créer un compte", vous acceptez notre',
        line_1: "ainsi que nos",
      },
    },
    Login: {
      header_title: "Connexion",
      title: "Bonjour,\nBon retour parmi nous",
      login_error:
        "Impossible de se connecter. Vérifiez vos identifiants ou créez un compte.",
      email: "E-mail",
      password: "Mot de passe",
      forgot_password: "Mot de passe oublié ?",
      login_button: "Se connecter",
      register_button: "Nouveau ici ? Créez un compte !",
      internal_error:
        "Une erreur interne du serveur est survenue. Réessayez plus tard.",
    },
    ForgotPassword: {
      alerts: {
        error: "Une erreur est survenue",
        warn: "Attention",
        code_error: "Une erreur est survenue lors de la demande du code.",
        length_code: "Veuillez saisir le code à 6 chiffres complet.",
        invalid_code: "Code invalide ou expiré.",
        reset_pass_error: "Impossible de réinitialiser le mot de passe.",
      },
      toasts: {
        switched_password: "Mot de passe modifié avec succès !",
      },
      header_title: "Récupérer le mot de passe",
      title: "Mot de passe perdu ?",
      subtitle:
        "Ne vous inquiétez pas ! Nous vous aiderons à récupérer l'accès à votre compte en quelques minutes.",
      email_placeholder: "E-mail ou Nom d'utilisateur",
      next_button: "Suivant",
      verify_code: "Code de vérification",
      verify_subtitle: "Entrez le code à 6 chiffres envoyé à {{masked}}.",
      confirm: "Confirmer",
      new_pass_title: "Créer un nouveau mot de passe",
      new_pass_subtitle:
        "Votre nouveau mot de passe doit être différent des mots de passe utilisés précédemment.",
      new_pass: "Nouveau mot de passe",
      pass_rules:
        "Votre mot de passe doit contenir au moins 8 caractères (dont au moins 1 majuscule), au moins 1 chiffre et 1 symbole.",
      confirm_pass: "Confirmez le nouveau mot de passe",
      confirm_pass_error: "Les mots de passe ne correspondent pas.",
      switch_pass: "Changer le mot de passe",
    },
  },
  TabBar: {
    groups: "Groupes",
    friends: "Amis",
    new_group: "Nouveau groupe",
    settings: "Options",
  },
  Home: {
    header_title: "Groupes",
    quick_access: "Accès rapide",
    empty_list: {
      title: "Que diriez-vous de rejoindre un groupe pour commencer ?",
      search_text: "Allez dans l'onglet",
      line_0: "et recherchez quelque chose ou rejoignez notre",
      official_group: "Groupe Officiel",
    },
    groups_list: {
      title: "Accéder aux groupes",
      subtitle_one: "Vous êtes dans {{count}} groupe",
      subtitle_other: "Vous êtes dans {{count}} groupes",
    },
  },
  Friends: {
    header_title: "Amis",
    title: "Messages directs",
    subtitle:
      "Envoyez des messages privés à vos amis. Vous ne pouvez parler qu'avec les personnes de votre liste d'amis.",
    empty_list_text: "Vous n'avez pas encore d'amis. Ajoutez de nouveaux amis.",
  },
  NewGroup: {
    header_title: "Nouveau groupe",
    avatar_select_label: "Choisissez une photo de profil",
    avatar_select_tip:
      "Nous recommandons une image de 600x600 pixels et de 5 Mo maximum",
    avatar_selected: "🖼 Cette photo est parfaite !",
    limit: {
      title: "Vous avez atteint la limite de {{count}} groupes !",
      subtitle:
        "Cette limite est fixée pour permettre à chacun de créer sa communauté sur Saturn Chat et éviter le spam.",
      premium:
        "Vous pouvez également devenir une Star et créer jusqu'à {{groups}} groupes avec {{participants}} participants chacun.",
    },
    form: {
      labels: {
        name: {
          label: "Nom du groupe",
          placeholder: "100 caractères max.",
        },
        desc: {
          label: "Décrivez votre groupe",
          placeholder: "500 caractères max.",
        },
        tags: {
          label: "Tags du groupe",
          placeholder: "séparer par des virgules",
        },
        public: "Public",
        private: "Privé",
      },
      create_group: "Créer le groupe",
    },
    star: "Devenir une Star",
  },
  Settings: {
    header_title: "Paramètres",
    alerts: {
      sign_out: {
        title: "😥 Voulez-vous vraiment partir ?",
        subtitle:
          "En vous déconnectant, vous ne recevrez pas de notifications pour les nouveaux messages, invitations ou autres.",
        ok_text: "Se déconnecter",
        cancel_text: "Annuler",
      },
    },
    general: {
      title: "Général",
      star: "Devenir une Star",
      manage_star: "Gérer le forfait Star",
      edit_profile: "Modifier le profil",
      languages: "Langues",
      dark_theme: "Mode Sombre",
      notifications: "Notifications",
    },
    account: {
      title: "Compte et confidentialité",
      edit_password: "Changer de mot de passe",
      security: {
        require_on_open: "Exiger un mot de passe à l'ouverture de l'application",
        interval: "Demander l'authentification",
        interval_title: "Demander l'authentification",
        interval_content: "Choisissez quand le verrouillage doit être demandé.",
        unavailable_title: "Authentification locale indisponible",
        unavailable_content:
          "Enregistrez une biométrie ou un mot de passe de l'appareil pour activer cette option.",
        unlock_prompt: "Déverrouillez Saturn Chat",
        unlock_message: "Authentifiez-vous pour ouvrir Saturn Chat",
        authenticating: "Authentification en attente",
        unlock_button: "Déverrouiller",
        cancel: "Annuler",
        intervals: {
          0: "À chaque ouverture",
          5: "Toutes les 5 minutes",
          15: "Toutes les 15 minutes",
          30: "Toutes les 30 minutes",
          60: "Toutes les heures",
        },
      },
    },
    about: {
      developer_options: "Options pour développeurs",
      use_dev_api: "Utiliser l'API de développement",
      title: "À propos",
      guidelines: "Règles de la communauté",
      privacy_policy: "Politique de confidentialité",
      feedback: "Envoyer des commentaires",
    },
    sign_out: "Déconnexion",
  },
  SendFeedback: {
    title: "Envoyer des commentaires",
    feedback_type: {
      bug: "Bugs",
      suggestion: "Suggestions",
      others: "Autres",
    },
    labels: {
      message: "Message",
    },
    done: "Envoyer",
    sent: "Commentaires envoyés avec succès !",
  },
  Search: {
    header_title: "Explorer",
    input_placeholder: "Que cherchez-vous aujourd'hui ?",
    title: "Aucun résultat pour le moment",
    subtitle:
      "Essayez de rechercher par nom de groupe, tag associé ou nom d'utilisateur.",
    loading: {
      title: "Recherche...",
      subtitle: "Cela peut prendre un instant",
    },
    participants_one: "participant",
    participants_other: "participants",
    filters: {
      all: "Tous",
      users: "Utilisateurs",
      groups: "Groupes",
    },
  },
  InviteManager: {
    header_title: "Invitations et demandes",
    subtitle: "Gérez vos invitations de groupe et demandes d'amis reçues.",
    empty_text:
      "Aucune invitation de groupe ni demande d'ami. Revenez plus tard.",
    toasts: {
      invite_accept: "Invitation acceptée !",
      invite_reject: "Invitation refusée :(",
      request_accept: "Demande d'ami acceptée avec succès !",
      request_reject: "Demande d'ami refusée avec succès",
    },
  },
  Profile: {
    friends: "Amis",
    participating: "Participation",
  },
  EditProfile: {
    header_title: "Modifier le profil",
    switch_avatar: "Changer d'avatar",
    searching: "Recherche...",
    errors: {
      "400": "Le nom d'utilisateur ne respecte pas les critères attendus",
      "404": "Le nom d'utilisateur n'a pas été fourni",
      "1000": "Impossible de récupérer le nom d'utilisateur",
      unavailable: "Le nom d'utilisateur n'est pas disponible",
    },
    toasts: {
      updated: "Profil mis à jour",
      update_avatar: "Mise à jour de l'avatar...",
      updated_avatar: "Avatar mis à jour",
      photo_permission:
        "Nous avons besoin de la permission d'accéder à vos photos pour modifier votre avatar !",
    },
    labels: {
      nickname: "Nom d'utilisateur",
      name: {
        label: "Nom",
        placeholder: "100 caractères max.",
      },
      bio: {
        label: "Bio",
        placeholder: "100 caractères max.",
      },
    },
    done: "Terminer",
  },
  SwitchLanguage: {
    header_title: "Langues",
    title: "Comprendre le fonctionnement des langues",
    subtitle:
      "La langue de l'application est définie par défaut selon votre appareil.\n\nPour la modifier, accédez aux paramètres de votre appareil et effectuez le changement ; l'application se mettra à jour automatiquement.",
  },
  SwitchPassword: {
    header_title: "Modifiez votre mot de passe",
    toasts: {
      updated_pass: "Mot de passe modifié avec succès !",
      incorrect_pass: "Mot de passe actuel incorrect !",
      error_pass: "Erreur lors de la modification du mot de passe !",
    },
    labels: {
      current_password: "Mot de passe actuel",
      new_password: {
        label: "Nouveau mot de passe",
        error: "Le mot de passe ne respecte pas les critères de sécurité",
        info: "Votre mot de passe doit contenir au moins 8 caractères (dont au moins 1 majuscule), au moins 1 chiffre et 1 symbole.",
      },
      confirm_pass: {
        label: "Confirmez le nouveau mot de passe",
        error: "Les mots de passe ne correspondent pas",
      },
    },
    done: "Changer le mot de passe",
  },
  Premium: {
    header_title: "Rejoignez la constellation !",
    be_star: "Devenez une Star !",
    title:
      "Obtenez des avantages et fonctionnalités incroyables dans Saturn Chat à un prix abordable !",
    subtitle:
      "Profitez au maximum de toutes les fonctionnalités disponibles, comme l'envoi de fichiers plus volumineux, la création de plus de groupes, la suppression des publicités et bien plus encore !",
    free_month: "Abonnez-vous maintenant et obtenez 1 mois gratuit !",
    buy_button: "À partir de {{price}}",
    vantages_title: "Avantages du forfait Star :",
    advantages: {
      0: "Totalement sans publicités gênantes !",
      1: "Augmentez par {{multiple}}x l'espace d'envoi de fichiers : de {{default}} Mo à un incroyable {{premium}} Mo.",
      2: "Augmentez la limite de groupes créables : de {{default}} à {{premium}} groupes.",
      3: "Augmentez le nombre de participants dans vos groupes : de {{default}} à {{premium}} participants.",
      4: "Augmentez le nombre de personnes autorisées dans un appel : de {{default}} à {{premium}} participants.",
      5: "Obtenez un badge exclusif à côté de votre nom !",
      6: "Vous aimez envoyer de longs textes ? Augmentez la limite de vos messages de {{default}} à un merveilleux {{premium}} caractères !",
      7: "Soutenez le développement de l'application et aidez-nous à apporter des nouveautés plus rapidement ❤",
      8: "Exportez les messages de vos groupes au format CSV.",
    },
  },
  ManagePremium: {
    header_title: "Gérer le forfait Star",
    alerts: {
      cancel_plan: {
        title: "❗ Êtes-vous sûr ?",
        content:
          "En annulant votre abonnement, vous perdez TOUS les avantages du forfait. De plus, VOUS NE RECEVREZ AUCUN REMBOURSEMENT POUR LE MOIS DÉJÀ PAYÉ (mais vous pourrez profiter des avantages jusqu'à la date de renouvellement).",
        ok_text: "Conserver le forfait",
        cancel_text: "Annuler le forfait",
      },
    },
    title: "Gérez votre forfait Star",
    subtitle:
      "Consultez les détails de votre forfait, tels que la date de renouvellement et le statut du paiement. Vous pouvez également annuler votre abonnement à tout moment.",
    plan_labels: {
      plan: "Forfait d'abonnement :",
      status: "Statut de l'abonnement",
      start: "Date d'achat",
      expire: "Date de renouvellement",
      resume: "Date de reprise",
    },
    payments: {
      0: "En attente",
      1: "Payé",
      2: "Essai",
      3: "Forfait mis à jour",
    },
    periods: {
      0: "Mensuel",
      1: "Trimestriel",
      2: "Annuel",
    },
    cancel_text: "Annuler l'abonnement",
  },
  ChoosePlan: {
    header_title: "Choisissez votre forfait",
    title: "Nous y sommes presque !",
    subtitle:
      "Choisissez maintenant votre forfait : mensuel, trimestriel ou annuel.",
    monthly: "Mensuel",
    quarterly: "Trimestriel",
    yearly: "Annuel",
    button_text: "Je veux celui-ci !",
    finished: {
      success_title: "Abonnement effectué avec succès !",
      error_title: "Impossible de finaliser l'abonnement",
      success_subtitle:
        "Vous pouvez maintenant profiter de tous les avantages du forfait Star ! Veuillez noter que le déverrouillage complet peut prendre quelques minutes.",
      error_subtitle:
        "Votre paiement a peut-être été refusé ou annulé par le store. Vérifiez et réessayez plus tard.",
    },
  },
  Call: {
    header_title: "Appel de groupe",
    participants_count: "{{count}} dans l'appel",
    participants_modal: {
      title: "Participants",
    },
    view_all: "Voir tout",
    floating_button: "Retourner à l'appel",
    alert_ok: "Compris",
    you: "Vous",
    notification: {
      channel_name: "Appels en cours",
      title: "Appel en cours",
      body: "Touchez pour revenir dans Saturn Chat",
    },
    events: {
      inactivity_closed: "L'appel a été fermé pour cause d'inactivité.",
      room_closed: "Cette salle d'appel a été fermée.",
    },
    errors: {
      default: {
        title: "Impossible de rejoindre l'appel",
        content: "Une erreur s'est produite lors de l'accès à l'appel.",
      },
      access_blocked: {
        title: "Accès bloqué",
        content: "Vous êtes bloqué dans ce groupe et ne pouvez pas participer à l'appel.",
      },
      group_invalid: {
        title: "Groupe invalide",
        content: "Vous n'appartenez pas à ce groupe ou la conversation n'est plus disponible.",
      },
      direct_limit: {
        title: "Appel à deux",
        content: "Cet appel direct ne peut inclure que les deux participants de la conversation.",
      },
      participant_limit: {
        title: "Limite d'appel",
      },
      inactivity_timeout: {
        title: "Appel terminé",
        content: "L'appel a été fermé pour cause d'inactivité.",
      },
      call_closed: {
        title: "Appel terminé",
        content: "Cette salle d'appel a été fermée.",
      },
      direct_not_part: {
        title: "Participation invalide",
        content: "Vous ne faites pas partie de cet appel direct.",
      },
    },
  },
  Chat: {
    alerts: {
      file_size: {
        title: "😱 Quel fichier lourd !",
        content:
          "Je ne peux pas charger un fichier aussi volumineux ; essayez d'envoyer un fichier jusqu'à {{amount}} Mo !",
        extra_button_text: "Obtenir le forfait Star",
      },
      same_file: {
        title: "🤔 J'ai déjà vu cela",
        content: "Vous avez déjà sélectionné ce fichier à envoyer !",
      },
      mic_perm: {
        title: "🙂 S'il vous plaît",
        content:
          "J'ai besoin de la permission d'utiliser votre microphone pour enregistrer des messages vocaux.",
      },
    },
    toasts: {
      sending_voice: "Envoi du message vocal...",
    },
    type_message: "Écrivez votre message...",
    drop_send: "Relâchez pour envoyer",
    sent: "Envoyé",
    limit_char: "Limite de {{count}} caractères atteinte !",
    no_send_message:
      " Vous ne pouvez pas envoyer de messages dans ce groupe, mais vous pouvez toujours les voir et recevoir des notifications.",
  },
  GroupConfig: {
    header_group_title: "Options du groupe",
    header_chat_title: "Options du tchat",
    alerts: {
      delete_group: {
        title: "⚠ Attention, c'est dangereux !",
        content:
          'Cette action est IRRÉVERSIBLE ! En supprimant le groupe "{{name}}", vous supprimerez également tous les messages, fichiers et tout ce qui y est enregistré !',
        ok_text: "Supprimer",
        cancel_text: "Annuler",
      },
      exit_group: {
        title: "😥 Voulez-vous vraiment quitter ?",
        content:
          "En quittant le groupe, vos messages seront conservés, mais vous ne recevrez plus de notifications et vous devrez être réinvité(e) pour revenir (s'il est privé).",
        ok_text: "Quitter",
      },
    },
    options: {
      general: {
        title: "Général",
        participants: "Participants",
        invite_users: "Inviter des utilisateurs",
        edit_group: "Modifier le groupe",
        details: "Voir les détails",
        notify_new_participants:
          "Avertir le propriétaire lorsque de nouveaux participants arrivent",
        accepting_new_users: "Accepter l'arrivée de nouveaux participants",
        max_participants:
          "Nombre maximum de participants (laisser à 0 pour illimité)",
        minimum_role_for_send_message:
          "Rôle minimum pour envoyer des messages dans le groupe",
        roles: {
          participant: "Participant",
          moderator: "Modérateur",
          manager: "Gestionnaire",
          admin: "Administrateur",
        },
      },
      participant: {
        send_notifications: "Recevoir les notifications de nouveaux messages",
        title: "Paramètres du participant",
      },
      danger_zone: {
        title: "Zone de danger",
        delete_group: "Supprimer le groupe",
        exit_group: "Quitter le groupe",
      },
    },
    toasts: {
      submit_success: "Paramètres modifiés avec succès",
      submit_error: "Impossible d'enregistrer les modifications",
    },
  },
  Participants: {
    header_title_one: "{{count}} Participant",
    header_title_other: "{{count}} Participants",
    title: "Tous les participants",
    created: "Créé le {{date}}",
    joined: "Rejoint le {{date}}",
    online: "En ligne",
    last_seen: "Vu pour la dernière fois le {{date}}",
    owner: "Propriétaire",
  },
  Participant: {
    title: "Options du participant",
    view_profile: "Voir le profil",
    change_role: "Changer le rôle",
    kick: "Expulser",
    ban: "Bannir le participant",
  },
  PunishParticipant: {
    title: "Êtes-vous sûr ?",
    desc_kick:
      'Vous êtes sur le point d\'expulser le participant "{{userName}}" du groupe "{{groupName}}". Êtes-vous sûr ?',
    desc_ban:
      'Vous êtes sur le point de bannir le participant "{{userName}}" du groupe "{{groupName}}". Êtes-vous sûr ?',
    notify_text: "Notifier le participant de la sanction",
    confirm_text_kick: "Oui, expulser maintenant !",
    confirm_text_ban: "Oui, bannir maintenant !",
    cancel_text: "Non, j'ai changé d'avis",
    toasts: {
      success: "Utilisateur sanctionné avec succès !",
      error: "Impossible de sanctionner l'utilisateur. Réessayez.",
    },
  },
  ChangeRole: {
    header_title: "Changer le rôle",
    title: "Rôles",
    subtitle:
      "Les membres disposant de rôles spéciaux peuvent gérer diverses fonctionnalités du groupe. N'attribuez des rôles importants qu'à des personnes de confiance.",
    roles: {
      participant: {
        name: "Participant",
        desc: "Ce rôle ne donne aucun pouvoir spécial au participant.",
      },
      mod: {
        name: "Modérateur",
        desc: "Les modérateurs veillent à la sécurité et à l'ordre du groupe.",
      },
      manager: {
        name: "Gestionnaire",
        desc: "Les gestionnaires aident à organiser le groupe et à amener de nouveaux membres.",
      },
      admin: {
        name: "Administrateur",
        desc: "Permet au participant d'avoir les mêmes pouvoirs que le propriétaire du groupe.",
      },
    },
    permissions: {
      create_invites:
        "Créer des invitations pour inviter de nouveaux utilisateurs",
      punish_members: "Sanctionner les participants qui enfreignent les règles",
      manage_roles: "Gérer les rôles",
      manage_messages: "Gérer les messages (comme les supprimer)",
      edit_group:
        "Modifier les informations du groupe (nom, avatar et description)",
      delete_group: "Supprimer le groupe",
    },
    toasts: {
      success: "Rôle de l'utilisateur modifié avec succès !",
      error: "Erreur lors du changement de rôle. Réessayez.",
    },
  },
  FriendsManager: {
    alerts: {
      unfriend: {
        title: "⚠️ Supprimer de la liste d'amis ?",
        content:
          "Si vous retirez cet utilisateur de votre liste d'amis, vous ne pourrez plus échanger de messages directs. Tous les messages seront supprimés pour les deux parties.",
        ok_text: "Supprimer l'ami",
      },
    },
    header_title: "Gérer les amis",
  },
  InviteUsers: {
    header_title: "Inviter",
    empty_title:
      "Aucun ami à inviter. Essayez de partager une invitation via un lien.",
    title: "Invitations du groupe",
    subtitle:
      "Créez et gérez toutes les invitations du groupe grâce à notre gestionnaire.",
    new_invite_text: "Gérer les invitations",
    friends_invite_title: "Invitez vos amis",
    friends_invite_subtitle:
      "Seuls les amis qui ne sont pas encore dans le groupe apparaissent ici.",
    invite: "Inviter",
    invited: "Invité",
    toasts: {
      success: "Invitation envoyée avec succès !",
      error: "Impossible d'inviter votre ami !",
    },
  },
  NewInvites: {
    header_title: "Créer des invitations",
    title: "Générer une invitation",
    subtitle: "Vous pouvez générer des invitations avec ces paramètres :",
    permanent: "Invitation permanente",
    usage_unlimited: "Utilisations illimitées",
    usage_one: "Utiliser au maximum {{count}} fois",
    usage_other: "Utiliser au maximum {{count}} fois",
    expire_one: "Expire dans {{count}} jour",
    expire_other: "Expire dans {{count}} jours",
    day_one: "Jour",
    day_other: "Jours",
    active_invites: "Invitations actives",
    generate: "Générer",
    expire_in: "Expire dans ",
    usage_amount_one: "Utilisé {{count}} fois sur ",
    usage_amount_other: "Utilisé {{count}} fois sur ",
    toasts: {
      error_create: "Impossible de créer l'invitation.",
      success_create: "Invitation créée avec succès !",
      error_remove: "Impossible de supprimer l'invitation.",
      success_remove: "Invitation supprimée avec succès !",
      copy_invite: "Invitation copiée !",
    },
  },
  EditGroup: {
    toasts: {
      success: "Groupe modifié avec succès !",
      avatar_permission: "Permission requise pour accéder à vos photos !",
      updating: "Mise à jour de l'avatar...",
      updated: "Avatar mis à jour",
    },
    header_title: "Modifier le groupe",
    switch_avatar: "Changer d'avatar",
    inputs: {
      name: "Nom",
      desc: "Description",
      public: "Rendre public",
    },
    done: "Terminer",
  },
  GroupInfos: {
    join: "Rejoindre",
    joined: "Membre",
    participants_one: "Participant",
    participants_other: "Participants",
    tags: "Tags du groupe",
    desc: "Description",
    no_desc: "Ce groupe ne possède pas de description.",
    no_tags: "Aucun tag défini",
    accepting_participants_text:
      "Ce groupe a atteint le nombre maximum de participants.",
    toasts: {
      error: "Impossible de rejoindre le groupe !",
    },
  },
  Report: {
    header_title: "Signaler",
    title: "Faire un signalement",
    subtitle:
      "Vous avez trouvé quelque chose d'inapproprié ? Signalez-le afin que nous puissions examiner la situation. Votre signalement est totalement anonyme.",
    types: {
      SPAM: "Spam et/ou messages indésirables",
      VIOLENCE: "Pratiques violentes, incitation au suicide ou armes à feu",
      SEXUAL: "Contenu sexuel, pédophilie ou maltraitance de mineurs",
      BULLYING: "Harcèlement ou irrespect envers les utilisateurs",
      RACISM: "Discours de haine, racisme, xénophobie, etc.",
      SCAM: "Arnaques, faux jeux-concours, extorsion, etc.",
      FAKE_ACCOUNT: "Faux contenu ou usurpation d'identité",
      DMCA: "Contenu protégé par le droit d'auteur",
      OTHER: "Autres",
    },
    done: "Signaler",
    sent: "Signalement effectué avec succès !",
  },
};