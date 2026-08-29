export const de = {
  Components: {
    Ads: {
      remove_ad: "Werbung entfernen",
    },
    GroupInvite: {
      participants: "Teilnehmer",
      join: "Beitreten",
    },
    FriendActionButtons: {
      title: "möchte dein Freund sein",
      accept: "Annehmen",
      reject: "Ablehnen",
    },
    AddFriendButton: {
      friends: "Freunde",
      requested: "Anfrage gesendet",
      request: "Als Freund hinzufügen",
    },
    Chat: {
      AudioPlayer: {},
      CurrentReplyingMessage: {
        file_amount_one: "Datei",
        file_amount_other: "Dateien",
        replying_text: "Du antwortest auf:",
        voice_message: "Sprachnachricht",
      },
      FilePreview: {
        alerts: {
          download: {
            title: "❗ Große Vorsicht",
            content:
              "Bist du sicher, dass du die Datei herunterladen möchtest? Schaddateien können dein Telefon beschädigen!\n\n📁 Dateiname: {{name}}",
            ok_text: "Herunterladen",
            cancel_text: "Abbrechen",
          },
        },
      },
      Message: {
        poll: "📊 Umfrage: {{question}}",
        toasts: {
          copied_message: "Nachricht kopiert",
        },
        alerts: {
          open_link: {
            title: "⚠ Vorsicht, das könnte gefährlich sein",
            content:
              "Bist du sicher, dass du diesen Link öffnen möchtest? Wir können deine Sicherheit beim Aufrufen nicht garantieren.\n\n{{url}}",
            ok_text: "Öffnen",
            cancel_text: "Nein",
          },
        },
        options: {
          reply: "Antworten",
          copy: "Kopieren",
          show_original_message: "Originalnachricht anzeigen",
          translate_message: "Nachricht übersetzen",
          original_restored: "Originalnachricht wiederhergestellt.",
          already_in_lang: "Die Nachricht ist bereits in deiner Sprache.",
          translated_success: "Nachricht übersetzt!",
          not_identified_lang: "Sprache konnte nicht identifiziert werden.",
          part_opt: "Teilnehmeroptionen",
          delete: "Löschen",
          report: "Nachricht melden",
        },
      },
      RecordingAudio: {
        recording: "Aufnahme läuft",
      },
      ReplyingMessage: {
        read_more: "Mehr lesen",
        read_less: "Weniger lesen",
        replying: "Antwort an:",
        voice_message: "🎤 Sprachnachricht",
        files_one: "Datei",
        files_other: "Dateien",
      },
      InviteInMessage: {
        invalid_invite_title: "🚫 Ungültige Einladung",
        invalid_invite_subtitle:
          "Die Einladung ist möglicherweise abgelaufen, wurde gelöscht oder hat die maximale Anzahl an Nutzungen erreicht!",
        invite_title: "Einladung für:",
        invite_screen_title: "Du wurdest in die Gruppe eingeladen:",
        no_desc: "Keine Beschreibung",
        joined_text: "Du bist bereits beigetreten!",
        join_text: "Gruppe beitreten",
        toasts: {
          joined: "Du bist der Gruppe '{{name}}' beigetreten!",
          error: "Einladung konnte nicht verwendet werden",
        },
      },
      LinkPreview: {
        watch_text: "Hier tippen zum Ansehen",
        link_copied: "Link kopiert",
      },
      Typing: {
        typing_user_one: "schreibt ",
        typing_user_other: "schreiben ",
        typing: "gerade",
        many: "Mehrere Benutzer",
      },
      Poll: {
        max_options: "Höchstens {{count}} Optionen erreicht.",
        min_options: "Die Umfrage muss mindestens {{count}} Optionen haben.",
        type_poll_question: "Gib die Umfragefrage ein.",
        create_poll: "Umfrage erstellen",
        options: "Optionen",
        question_input_placeholder: "Z. B.: Wo findet die Veranstaltung statt?",
        question_option_placeholder: "Option {{count}}",
        add_option: "Option hinzufügen",
        multiple: "Mehrfachauswahl erlauben",
        question: "Frage",
      },
    },
    Modals: {
      EmblemModal: {
        title: "Schönes Abzeichen, oder?",
        content:
          "Es wird an ganz besondere Personen vergeben, die Saturn Chat mit dem Star-Plan unterstützen.",
        premium_text:
          "Willst du auch eins? Dann werde Teil der Konstellation!",
        be_star: "Star erhalten",
      },
    },
    Alert: {
      cancel: "Abbrechen",
    },
  },
  OnBoarding: {
    done: "Loslegen",
    skip: "Überspringen",
    pages: {
      0: {
        title: "Willkommen bei Saturn Chat!",
        subtitle:
          "Hier findest du eine riesige Auswahl an Gruppen (oder kannst ganz einfach deine eigene erstellen).",
      },
      1: {
        title: "Sende Nachrichten mit Leichtigkeit!",
        subtitle:
          "Mit nur wenigen Klicks kannst du Nachrichten mit Fotos, Videos und sogar Sprachnachrichten senden und empfangen.",
      },
      2: {
        title: "Du bist sicher!",
        subtitle:
          "Hier bleibt deine Privatsphäre geschützt und deine Daten werden an niemanden verkauft!",
      },
      3: {
        title: "Werde ein Star!",
        subtitle:
          "Wenn du bereit bist, gehe ins Einstellungsmenü, hol dir den Star-Plan und genieße Saturn Chat in vollen Zügen!",
      },
    },
  },
  Auth: {
    Home: {
      title: "Wollen wir anfangen?",
      subtitle: "Melde dich an oder erstelle dein Konto, um die App zu nutzen!",
      login: "Anmelden",
      new_account: "Konto erstellen",
    },
    CreateAccount: {
      header_title: "Konto erstellen",
      avatar_select_label: "Wähle ein Profilbild",
      avatar_select_tip:
        "💡 Hinweis: Du musst ein Bild mit maximal 5 MB auswählen.",
      avatar_selected: "🖼 Dieses Foto ist perfekt!",
      register_error:
        "Konto konnte nicht erstellt werden. Möglicherweise wird die E-Mail bereits verwendet; versuche dich anzumelden.",
      internal_error: "Ein interner Serverfehler ist aufgetreten. Bitte versuche es später erneut.",
    },
    nickname_rules:
      "Muss ein eindeutiger Name sein, der nur aus Zahlen und Buchstaben besteht. Es sind nur Bindestriche (-) und Unterstriche (_) erlaubt. Wenn kein Benutzername angegeben wird, wird automatisch einer für dich generiert.",
    searching: "Suchen...",
    labels: {
      name: "Name",
      nickname: "Benutzername",
      email: {
        label: "E-Mail",
        error: "Diese E-Mail ist ungültig",
      },
      password: {
        label: "Gib ein Passwort ein",
        error: "Das Passwort erfüllt nicht die Sicherheitsstandards",
        info: "Dein Passwort muss mindestens 8 Zeichen lang sein (darunter mindestens 1 Großbuchstabe), mindestens 1 Zahl und 1 Symbol enthalten.",
      },
      password_again: {
        label: "Bestätige dein Passwort",
        error: "Die Passwörter stimmen nicht überein",
      },
    },
    register_button: "Konto erstellen",
    consent: {
      guidelines: "Community-Richtlinien",
      privacy_policy: "Datenschutzrichtlinie",
      line_0: 'Mit dem Klick auf "Konto erstellen" akzeptierst du unsere',
      line_1: "sowie unsere",
    },
    Login: {
      header_title: "Anmelden",
      title: "Hallo,\nWillkommen zurück",
      login_error:
        "Anmeldung fehlgeschlagen. Überprüfe deine Daten oder erstelle ein Konto.",
      email: "E-Mail",
      password: "Passwort",
      forgot_password: "Passwort vergessen?",
      login_button: "Einloggen",
      register_button: "Neu hier? Erstelle ein Konto!",
      internal_error: "Ein interner Serverfehler ist aufgetreten. Bitte versuche es später erneut.",
    },
  },
  TabBar: {
    groups: "Gruppen",
    friends: "Freunde",
    new_group: "Neue Gruppe",
    settings: "Optionen",
  },
  Home: {
    header_title: "Gruppen",
    quick_access: "Schnellzugriff",
    empty_list: {
      title: "Wie wäre es, wenn du einer Gruppe beitrittst?",
      search_text: "Gehe zum Tab",
      line_0: "und suche nach etwas oder tritt unserer",
      official_group: "Offiziellen Gruppe bei",
    },
    groups_list: {
      title: "Gruppen aufrufen",
      subtitle_one: "Du bist in {{count}} Gruppe",
      subtitle_other: "Du bist in {{count}} Gruppen",
    },
  },
  Friends: {
    header_title: "Freunde",
    title: "Direktnachrichten",
    subtitle:
      "Sende private Nachrichten an deine Freunde. Du kannst nur mit Personen aus deiner Freundesliste chatten.",
    empty_list_text: "Du hast noch keine Freunde. Füge neue Freunde hinzu.",
  },
  NewGroup: {
    header_title: "Neue Gruppe",
    avatar_select_label: "Wähle ein Profilbild",
    avatar_select_tip:
      "Wir empfehlen ein Bild mit 600x600 Pixeln und max. 5 MB",
    avatar_selected: "🖼 Dieses Foto ist perfekt!",
    limit: {
      title: "Du hast das Limit von {{count}} Gruppen erreicht!",
      subtitle:
        "Dieses Limit dient dazu, dass jeder seine Gemeinschaften auf Saturn Chat erstellen kann und Probleme wie Spam vermieden werden.",
      premium:
        "Du kannst auch Star werden und bis zu {{groups}} Gruppen mit jeweils {{participants}} Teilnehmern erstellen.",
    },
    form: {
      labels: {
        name: {
          label: "Gruppenname",
          placeholder: "max. 100 Zeichen",
        },
        desc: {
          label: "Beschreibe deine Gruppe",
          placeholder: "max. 500 Zeichen",
        },
        tags: {
          label: "Gruppen-Tags",
          placeholder: "durch Kommas trennen",
        },
        public: "Öffentlich",
        private: "Privat",
      },
      create_group: "Gruppe erstellen",
    },
    star: "Ein Star werden",
  },
  Settings: {
    header_title: "Einstellungen",
    alerts: {
      sign_out: {
        title: "😥 Willst du wirklich gehen?",
        subtitle:
          "Wenn du dich abmeldest, erhältst du keine Benachrichtigungen über neue Nachrichten, Einladungen oder Ähnliches.",
        ok_text: "Abmelden",
        cancel_text: "Abbrechen",
      },
    },
    general: {
      title: "Allgemein",
      star: "Werde ein Star",
      manage_star: "Star-Plan verwalten",
      edit_profile: "Profil bearbeiten",
      languages: "Sprachen",
      dark_theme: "Dunkler Modus",
      notifications: "Benachrichtigungen",
    },
    account: {
      title: "Konto und Datenschutz",
      edit_password: "Passwort ändern",
    },
    about: {
      developer_options: "Entwickleroptionen",
      use_dev_api: "Entwickler-API verwenden",
      title: "Über",
      guidelines: "Community-Richtlinien",
      privacy_policy: "Datenschutzrichtlinie",
      feedback: "Feedback senden",
    },
    sign_out: "Vom Konto abmelden",
  },
  SendFeedback: {
    title: "Feedback senden",
    feedback_type: {
      bug: "Fehler",
      suggestion: "Vorschläge",
      others: "Sonstige",
    },
    labels: {
      message: "Nachricht",
    },
    done: "Senden",
    sent: "Feedback erfolgreich gesendet!",
  },
  Search: {
    header_title: "Entdecken",
    input_placeholder: "Wonach suchst du heute?",
    title: "Keine Ergebnisse im Moment",
    subtitle:
      "Versuche nach einem Gruppennamen, einem passenden Tag oder einem Benutzernamen zu suchen.",
    loading: {
      title: "Suchen...",
      subtitle: "Dies kann einen Moment dauern",
    },
    participants_one: "Teilnehmer",
    participants_other: "Teilnehmer",
    filters: {
      all: "Alle",
      users: "Benutzer",
      groups: "Gruppen",
    },
  },
  InviteManager: {
    header_title: "Einladungen und Anfragen",
    subtitle: "Verwalte deine erhaltenen Einladungen und Freundschaftsanfragen.",
    empty_empty_text:
      "Keine Gruppeneinladungen oder Freundschaftsanfragen. Schau später noch einmal vorbei.",
    toasts: {
      invite_accept: "Einladung angenommen!",
      invite_reject: "Einladung abgelehnt :(",
      request_accept: "Anfrage erfolgreich angenommen!",
      request_reject: "Anfrage erfolgreich abgelehnt",
    },
  },
  Profile: {
    friends: "Freunde",
    participating: "Dabei",
  },
  EditProfile: {
    header_title: "Profil bearbeiten",
    switch_avatar: "Avatar wechseln",
    searching: "Suchen...",
    errors: {
      "400": "Der Benutzername entspricht nicht den erwarteten Standards",
      "404": "Der Benutzername wurde nicht angegeben",
      "1000": "Benutzername konnte nicht abgerufen werden",
      unavailable: "Der Benutzername ist nicht verfügbar",
    },
    toasts: {
      updated: "Profil aktualisiert",
      update_avatar: "Avatar wird aktualisiert...",
      updated_avatar: "Avatar aktualisiert",
      photo_permission:
        "Wir benötigen die Berechtigung zum Zugriff auf deine Fotos, um deinen Avatar zu ändern!",
    },
    labels: {
      nickname: "Benutzername",
      name: {
        label: "Name",
        placeholder: "max. 100 Zeichen",
      },
      bio: {
        label: "Info",
        placeholder: "max. 100 Zeichen",
      },
    },
    done: "Fertig",
  },
  SwitchLanguage: {
    header_title: "Sprachen",
    title: "Erfahre, wie Sprachen funktionieren",
    subtitle:
      "Die App-Sprache richtet sich nach der Standardsprache deines Geräts.\n\nUm sie zu ändern, gehe einfach in die Geräteeinstellungen und passe die Sprache an. Die App aktualisiert sich automatisch.",
  },
  SwitchPassword: {
    header_title: "Ändere dein Passwort",
    toasts: {
      updated_pass: "Passwort erfolgreich geändert!",
      incorrect_pass: "Aktuelles Passwort ist falsch!",
      error_pass: "Fehler beim Ändern des Passworts!",
    },
    labels: {
      current_password: "Aktuelles Passwort",
      new_password: {
        label: "Neues Passwort",
        error: "Das Passwort erfüllt nicht die Sicherheitsstandards",
        info: "Dein Passwort muss mindestens 8 Zeichen lang sein (darunter mindestens 1 Großbuchstabe), mindestens 1 Zahl und 1 Symbol enthalten.",
      },
      confirm_pass: {
        label: "Neues Passwort bestätigen",
        error: "Die Passwörter stimmen nicht überein",
      },
    },
    done: "Passwort ändern",
  },
  Premium: {
    header_title: "Werde Teil der Konstellation!",
    be_star: "Werde ein Star!",
    title:
      "Erhalte unglaubliche Vorteile und Funktionen bei Saturn Chat zu einem erschwinglichen Preis!",
    subtitle:
      "Nutze alle verfügbaren Funktionen optimal aus: größere Dateien senden, mehr Gruppen erstellen, lästige Werbung entfernen und vieles mehr!",
    free_month: "Jetzt abonnieren und 1 Monat gratis erhalten!",
    buy_button: "Erhalten ab {{price}}",
    vantages_title: "Vorteile des Star-Plans:",
    advantages: {
      0: "Vollkommen frei von lästiger Werbung!",
      1: "Erhöhe den Speicherplatz für Dateiuploads um das {{multiple}}-fache: von {{default}} MB auf unglaubliche {{premium}} MB.",
      2: "Erhöhe die Anzahl der Gruppen, die du erstellen kannst: von {{default}} auf {{premium}} Gruppen.",
      3: "Erhöhe die Anzahl der Teilnehmer in deinen Gruppen: von {{default}} auf {{premium}} Teilnehmer.",
      4: "Erhalte ein exklusives Abzeichen neben deinem Namen zum Angeben!",
      5: "Schreibst du gerne lange Texte? Erhöhe dein Nachrichtenlimit von {{default}} auf wunderbare {{premium}} Zeichen!",
      6: "Unterstütze die Entwicklung der App und hilf uns, neue Funktionen schneller zu bringen ❤",
      7: "Exportiere deine Gruppennachrichten im CSV-Format.",
    },
  },
  ManagePremium: {
    header_title: "Star-Plan verwalten",
    alerts: {
      cancel_plan: {
        title: "❗ Bist du dir sicher?",
        content:
          "Wenn du dein Abonnement kündigst, verlierst du ALLE durch den Plan gewährten Vorteile. Außerdem ERHÄLTST DU KEINE RÜCKERSTATTUNG FÜR DEN BEREITS BEZAHLTEN MONAT (du kannst die Vorteile jedoch bis zum Verlängerungsdatum nutzen).",
        ok_text: "Plan behalten",
        cancel_text: "Plan kündigen",
      },
    },
    title: "Verwalte deinen Star-Plan",
    subtitle:
      "Hier siehst du Details zu deinem Plan, wie das Verlängerungsdatum und den Zahlungsstatus. Du kannst dein Abonnement hier auch jederzeit kündigen.",
    plan_labels: {
      plan: "Abonnement-Plan:",
      status: "Abonnementstatus",
      start: "Kaufdatum",
      expire: "Verlängerungsdatum",
      resume: "Rückkehrdatum",
    },
    payments: {
      0: "Ausstehend",
      1: "Bezahlt",
      2: "Testversion",
      3: "Plan aktualisiert",
    },
    periods: {
      0: "Monatlich",
      1: "Vierteljährlich",
      2: "Jährlich",
    },
    cancel_text: "Abonnement kündigen",
  },
  ChoosePlan: {
    header_title: "Wähle deinen Plan",
    title: "Wir sind fast da!",
    subtitle:
      "Jetzt musst du den gewünschten Plan auswählen. Du kannst zwischen monatlich, vierteljährlich oder jährlich wählen.",
    monthly: "Monatlich",
    quarterly: "Vierteljährlich",
    yearly: "Jährlich",
    button_text: "Den möchte ich!",
    finished: {
      success_title: "Abonnement erfolgreich abgeschlossen!",
      error_title: "Dein Abonnement konnte nicht verarbeitet werden",
      success_subtitle:
        "Du kannst jetzt die zahlreichen Vorteile des Star-Plans nutzen! Bitte beachte jedoch, dass es einige Minuten dauern kann, bis alle Vorteile vollständig freigeschaltet sind.",
      error_subtitle:
        "Deine Zahlung wurde möglicherweise abgelehnt oder der Kauf vom App Store storniert. Überprüfe dies und versuche es später noch einmal.",
    },
  },
  Chat: {
    alerts: {
      file_size: {
        title: "😱 Das ist zu schwer!",
        content:
          "Ich kann nichts laden, das so groß ist; versuche es mit einer Datei bis zu {{amount}} MB!",
        extra_button_text: "Star-Plan holen",
      },
      same_file: {
        title: "🤔 Das kenne ich schon",
        content: "Du hast diese Datei bereits zum Senden ausgewählt!",
      },
      mic_perm: {
        title: "🙂 Bitte",
        content:
          "Ich benötige die Berechtigung zur Nutzung deines Mikrofons, um Audios aufnehmen zu können.",
      },
    },
    toasts: {
      sending_voice: "Sprachnachricht wird gesendet...",
    },
    type_message: "Schreibe deine Nachricht...",
    drop_send: "Zum Senden loslassen",
    sent: "Gesendet",
    limit_char: "Limit von {{count}} Zeichen erreicht!",
    no_send_message:
      " Du kannst in dieser Gruppe keine Nachrichten senden, aber du kannst sie weiterhin sehen und Benachrichtigungen erhalten.",
  },
  GroupConfig: {
    header_group_title: "Gruppenoptionen",
    header_chat_title: "Chat-Optionen",
    alerts: {
      delete_group: {
        title: "⚠ Vorsicht, das ist gefährlich!",
        content:
          'Diese Aktion ist UNWIDERRUFLICH! Wenn du die Gruppe "{{name}}" löschst, löschst du auch alle Nachrichten, Dateien und alles andere, was darin gespeichert ist!',
        ok_text: "Löschen",
        cancel_text: "Abbrechen",
      },
      exit_group: {
        title: "😥 Möchtest du die Gruppe wirklich verlassen?",
        content:
          "Wenn du die Gruppe verlässt, bleiben deine Nachrichten erhalten, du erhältst jedoch keine Benachrichtigungen über neue Nachrichten und musst neu eingeladen werden (falls die Gruppe privat ist).",
        ok_text: "Verlassen",
      },
    },
    options: {
      general: {
        title: "Allgemein",
        participants: "Teilnehmer",
        invite_users: "Benutzer einladen",
        edit_group: "Gruppe bearbeiten",
        details: "Details anzeigen",
        notify_new_participants:
          "Den Inhaber benachrichtigen, wenn neue Teilnehmer der Gruppe beitreten",
        accepting_new_users: "Beitritt neuer Teilnehmer akzeptieren",
        max_participants:
          "Maximale Anzahl an Teilnehmern (0 für unbegrenzt lassen)",
        minimum_role_for_send_message:
          "Mindestrolle zum Senden von Nachrichten in der Gruppe (Rollen unterhalb der ausgewählten können keine Nachrichten senden)",
        roles: {
          participant: "Teilnehmer",
          moderator: "Moderator",
          manager: "Manager",
          admin: "Administrator",
        },
      },
      participant: {
        send_notifications: "Benachrichtigungen über neue Nachrichten erhalten",
        title: "Teilnehmereinstellungen",
      },
      danger_zone: {
        title: "Gefahrenzone",
        delete_group: "Gruppe löschen",
        exit_group: "Gruppe verlassen",
      },
    },
    toasts: {
      submit_success: "Einstellungen erfolgreich aktualisiert",
      submit_error: "Änderungen konnten nicht gespeichert werden",
    },
  },
  Participants: {
    header_title_one: "{{count}} Teilnehmer",
    header_title_other: "{{count}} Teilnehmer",
    title: "Alle Teilnehmer",
    created: "Erstellt am {{date}}",
    joined: "Beigetreten am {{date}}",
    online: "Online",
    last_seen: "Zuletzt online am {{date}}",
    owner: "Inhaber",
  },
  Participant: {
    title: "Teilnehmeroptionen",
    view_profile: "Profil anzeigen",
    change_role: "Rolle ändern",
    kick: "Kicken",
    ban: "Teilnehmer sperren",
  },
  PunishParticipant: {
    title: "Bist du dir sicher?",
    desc_kick:
      'Du bist im Begriff, den Teilnehmer "{{userName}}" aus der Gruppe "{{groupName}}" zu kicken. Bist du sicher?',
    desc_ban:
      'Du bist im Begriff, den Teilnehmer "{{userName}}" aus der Gruppe "{{groupName}}" zu sperren. Bist du sicher?',
    notify_text: "Teilnehmer über die Bestrafung benachrichtigen",
    confirm_text_kick: "Ja, jetzt kicken!",
    confirm_text_ban: "Ja, jetzt sperren!",
    cancel_text: "Nein, ich habe es mir anders überlegt",
    toasts: {
      success: "Benutzer erfolgreich bestraft!",
      error: "Benutzer konnte nicht bestraft werden. Versuche es erneut.",
    },
  },
  ChangeRole: {
    header_title: "Rolle ändern",
    title: "Rollen",
    subtitle:
      "Mitglieder mit speziellen Rollen können verschiedene Gruppenfunktionen steuern (wie Verwaltung von Rollen und Einladungen, Bearbeitung etc.). Vergib wichtige Rollen nur an Personen, denen du vertraust.",
    roles: {
      participant: {
        name: "Teilnehmer",
        desc: "Diese Rolle verleiht dem Teilnehmer keine besonderen Befugnisse.",
      },
      mod: {
        name: "Moderator",
        desc: "Moderatoren kümmern sich um die Sicherheit der Gruppe.",
      },
      manager: {
        name: "Manager",
        desc: "Manager helfen bei der Organisation der Gruppe und bringen neue Benutzer ein.",
      },
      admin: {
        name: "Administrator",
        desc: "Ermöglicht dem Teilnehmer dieselben Befugnisse wie dem Gruppeninhaber.",
      },
    },
    permissions: {
      create_invites: "Einladungen erstellen, um neue Benutzer einzuladen",
      punish_members: "Teilnehmer bestrafen, die gegen Regeln verstoßen",
      manage_roles: "Rollen verwalten",
      manage_messages: "Nachrichten verwalten (z. B. löschen)",
      edit_group: "Gruppeninformationen bearbeiten (Name, Avatar, Beschreibung)",
      delete_group: "Gruppe löschen",
    },
    toasts: {
      success: "Benutzerrolle erfolgreich geändert!",
      error: "Fehler beim Ändern der Rolle. Versuche es erneut.",
    },
  },
  FriendsManager: {
    alerts: {
      unfriend: {
        title: "⚠️ Freundschaft wirklich beenden?",
        content:
          "Wenn du diesen Benutzer aus deiner Freundesliste entfernst, kannst du keine Direktnachrichten mehr austauschen. Alle Nachrichten zwischen euch werden für beide gelöscht.",
        ok_text: "Freundschaft beenden",
      },
    },
    header_title: "Freunde verwalten",
  },
  InviteUsers: {
    header_title: "Einladen",
    empty_title:
      "Keine Freunde zum Einladen vorhanden. Versuche eine Einladung über Links zu teilen.",
    title: "Gruppeneinladungen",
    subtitle:
      "Erstelle und verwalte alle Gruppeneinladungen über unseren Manager.",
    new_invite_text: "Einladungen verwalten",
    friends_invite_title: "Lade deine Freunde ein",
    friends_invite_subtitle:
      "Hier erscheinen nur Freunde, die nicht in der Gruppe sind. Sie müssen die Einladung annehmen, um beizutreten.",
    invite: "Einladen",
    invited: "Eingeladen",
    toasts: {
      success: "Einladung erfolgreich gesendet!",
      error: "Dein Freund konnte nicht eingeladen werden!",
    },
  },
  NewInvites: {
    header_title: "Einladungen erstellen",
    title: "Einladung generieren",
    subtitle: "Du kannst Einladungen mit diesen Einstellungen generieren:",
    permanent: "Dauerhafte Einladung",
    usage_unlimited: "Unbegrenzte Nutzungen",
    usage_one: "Höchstens {{count}} Mal verwenden",
    usage_other: "Höchstens {{count}} Mal verwenden",
    expire_one: "Läuft in {{count}} Tag ab",
    expire_other: "Läuft in {{count}} Tagen ab",
    day_one: "Tag",
    day_other: "Tage",
    active_invites: "Aktive Einladungen",
    generate: "Generieren",
    expire_in: "Läuft ab in ",
    usage_amount_one: "Wurde {{count}} Mal verwendet von ",
    usage_amount_other: "Wurde {{count}} Mal verwendet von ",
    toasts: {
      error_create: "Einladung konnte nicht erstellt werden.",
      success_create: "Einladung erfolgreich erstellt!",
      error_remove: "Einladung konnte nicht entfernt werden.",
      success_remove: "Einladung erfolgreich entfernt!",
      copy_invite: "Einladung kopiert!",
    },
  },
  EditGroup: {
    toasts: {
      success: "Gruppe erfolgreich bearbeitet!",
      avatar_permission: "Wir benötigen die Berechtigung zum Zugriff auf deine Fotos!",
      updating: "Avatar wird aktualisiert...",
      updated: "Avatar aktualisiert",
    },
    header_title: "Gruppe bearbeiten",
    switch_avatar: "Avatar wechseln",
    inputs: {
      name: "Name",
      desc: "Beschreibung",
      public: "Öffentlich machen",
    },
    done: "Fertig",
  },
  GroupInfos: {
    join: "Beitreten",
    joined: "Dabei",
    participants_one: "Teilnehmer",
    participants_other: "Teilnehmer",
    tags: "Gruppen-Tags",
    desc: "Beschreibung",
    no_desc: "Diese Gruppe hat keine Beschreibung.",
    no_tags: "Keine Tags definiert",
    accepting_participants_text:
      "Diese Gruppe hat die maximale Anzahl an Teilnehmern erreicht.",
    toasts: {
      error: "Beitritt zur Gruppe nicht möglich!",
    },
  },
  Report: {
    header_title: "Melden",
    title: "Reiche deine Meldung ein",
    subtitle:
      "Etwas stimmt nicht? Reiche eine Meldung ein, damit wir die Situation prüfen und entsprechende Maßnahmen ergreifen können. Keine Sorge, deine Meldung ist absolut anonym.",
    types: {
      SPAM: "Spam und/oder unerwünschte Nachrichten",
      VIOLENCE:
        "Gewalttätige Praktiken, Aufforderung zum Selbstmord oder Darstellung von Schusswaffen",
      SEXUAL: "Sexuelle Inhalte, Pädophilie oder Kindesmissbrauch",
      BULLYING: "Mobbing oder Respektlosigkeit gegenüber anderen Nutzern",
      RACISM: "Hassrede, Rassismus, Fremdenfeindlichkeit und Ähnliches",
      SCAM: "Betrug, gefälschte Gewinnspiele, Erpressung und Ähnliches",
      FAKE_ACCOUNT: "Falsche Inhalte oder Identitätsdiebstahl",
      DMCA: "Urheberrechtlich geschützte Inhalte",
      OTHER: "Sonstige",
    },
    done: "Melden",
    sent: "Meldung erfolgreich eingereicht!",
  },
};