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
            title: "❗ Sei vorsichtig",
            content:
              "Bist du sicher, dass du diese Datei herunterladen möchtest? Schädliche Dateien können deinem Telefon schaden!\n\n📁 Dateiname: {{name}}",
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
            title: "⚠ Vorsicht, dies könnte gefährlich sein",
            content:
              "Bist du sicher, dass du diesen Link öffnen möchtest? Wir können deine Sicherheit nicht garantieren.\n\n{{url}}",
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
          not_identified_lang: "Sprache konnte nicht erkannt werden.",
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
          "Die Einladung ist möglicherweise abgelaufen, wurde gelöscht oder hat das Nutzungslimit erreicht!",
        invite_title: "Einladung zu:",
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
        typing_user_one: "tippt ",
        typing_user_other: "tippen ",
        typing: "gerade",
        many: "Mehrere Benutzer",
      },
      Poll: {
        max_options: "Maximal {{count}} Optionen erreicht.",
        min_options: "Die Umfrage muss mindestens {{count}} Optionen haben.",
        type_poll_question: "Gib die Frage für die Umfrage ein.",
        create_poll: "Umfrage erstellen",
        options: "Optionen",
        question_input_placeholder: "Z.B.: Wo findet das Event statt?",
        question_option_placeholder: "Option {{count}}",
        add_option: "Option hinzufügen",
        multiple: "Mehrfachauswahl erlauben",
        question: "Frage",
      },
    },
    Modals: {
      EmblemModal: {
        title: "Cooles Abzeichen, oder?",
        content:
          "Es wird besonderen Personen verliehen, die Saturn Chat mit dem Star-Plan unterstützen.",
        premium_text: "Möchtest du auch eins? Werde Teil der Konstellation!",
        be_star: "Star holen",
      },
    },
    Alert: {
      cancel: "Abbrechen",
    },
  },
  OnBoarding: {
    done: "Starten",
    skip: "Überspringen",
    pages: {
      0: {
        title: "Willkommen bei Saturn Chat!",
        subtitle:
          "Hier findest du eine riesige Auswahl an Gruppen (oder du erstellst eine nach deinen Wünschen).",
      },
      1: {
        title: "Sende Nachrichten mit Leichtigkeit!",
        subtitle:
          "Mit nur wenigen Klicks kannst du Nachrichten mit Fotos, Videos und sogar Sprachnachrichten senden und empfangen.",
      },
      2: {
        title: "Du bist sicher!",
        subtitle:
          "Deine Privatsphäre bleibt hier geschützt und deine Daten werden an niemanden verkauft!",
      },
      3: {
        title: "Werde ein Star!",
        subtitle:
          "Wenn du bereit bist, gehe zu den Einstellungen, hole dir den Star-Plan und genieße Saturn Chat in vollen Zügen!",
      },
    },
  },
  Auth: {
    Home: {
      title: "Wollen wir anfangen?",
      subtitle: "Melde dich an oder erstelle ein Konto, um die App zu nutzen!",
      login: "Anmelden",
      new_account: "Konto erstellen",
    },
    CreateAccount: {
      header_title: "Konto erstellen",
      avatar_select_label: "Profilbild auswählen",
      avatar_select_tip: "💡 Hinweis: Wähle ein Bild mit maximal 5 MB Größe.",
      avatar_selected: "🖼 Dieses Foto ist perfekt!",
      register_error:
        "Konto konnte nicht erstellt werden. Die E-Mail wird möglicherweise bereits verwendet.",
      internal_error:
        "Ein interner Serverfehler ist aufgetreten. Bitte versuche es später erneut.",
      nickname_rules:
        "Muss ein eindeutiger Name sein, der nur Buchstaben und Zahlen enthält. Nur Bindestriche (-) und Unterstriche (_) sind erlaubt. Falls kein Name angegeben wird, wird automatisch einer generiert.",
      searching: "Suchen...",
      labels: {
        name: "Name",
        nickname: "Benutzername",
        email: {
          label: "E-Mail",
          error: "Diese E-Mail-Adresse ist ungültig",
        },
        password: {
          label: "Passwort eingeben",
          error: "Passwort entspricht nicht den Sicherheitsstandards",
          info: "Dein Passwort muss mindestens 8 Zeichen enthalten (davon mind. 1 Großbuchstabe), mindestens 1 Zahl und 1 Symbol.",
        },
        password_again: {
          label: "Passwort bestätigen",
          error: "Die Passwörter stimmen nicht überein",
        },
      },
      register_button: "Konto erstellen",
      consent: {
        guidelines: "Community-Richtlinien",
        privacy_policy: "Datenschutzrichtlinie",
        line_0: 'Mit dem Klick auf "Konto erstellen" akzeptierst du unsere',
        line_1: "und unsere",
      },
    },
    Login: {
      header_title: "Anmelden",
      title: "Hallo,\nWillkommen zurück",
      login_error:
        "Anmeldung fehlgeschlagen. Überprüfe deine Daten oder erstelle ein Konto.",
      email: "E-Mail",
      password: "Passwort",
      forgot_password: "Passwort vergessen?",
      login_button: "Anmelden",
      register_button: "Neu hier? Erstelle ein Konto!",
      internal_error:
        "Ein interner Serverfehler ist aufgetreten. Bitte versuche es später erneut.",
    },
    ForgotPassword: {
      alerts: {
        error: "Ein Fehler ist aufgetreten",
        warn: "Achtung",
        code_error: "Fehler beim Anfordern des Codes.",
        length_code: "Gib den vollständigen 6-stelligen Code ein.",
        invalid_code: "Ungültiger oder abgelaufener Code.",
        reset_pass_error: "Passwort konnte nicht zurückgesetzt werden.",
      },
      toasts: {
        switched_password: "Passwort erfolgreich geändert!",
      },
      header_title: "Passwort wiederherstellen",
      title: "Passwort vergessen?",
      subtitle:
        "Keine Sorge! Wir helfen dir, in wenigen Minuten wieder Zugriff auf dein Konto zu erhalten.",
      email_placeholder: "E-Mail oder Benutzername",
      next_button: "Weiter",
      verify_code: "Bestätigungscode",
      verify_subtitle:
        "Gib den 6-stelligen Code ein, der an {{masked}} gesendet wurde.",
      confirm: "Bestätigen",
      new_pass_title: "Neues Passwort erstellen",
      new_pass_subtitle:
        "Dein neues Passwort muss sich von früher verwendeten Passwörtern unterscheiden.",
      new_pass: "Neues Passwort",
      pass_rules:
        "Dein Passwort muss mindestens 8 Zeichen (mind. 1 Großbuchstabe), mindestens 1 Zahl und 1 Symbol enthalten.",
      confirm_pass: "Neues Passwort bestätigen",
      confirm_pass_error: "Die Passwörter stimmen nicht überein.",
      switch_pass: "Passwort ändern",
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
      title: "Wie wäre es, einer Gruppe beizutreten?",
      search_text: "Gehe zum Reiter",
      line_0: "und suche nach etwas oder trete unserer",
      official_group: "Offizielle Gruppe bei",
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
      "Sende private Nachrichten an deine Freunde. Du kannst nur mit Personen aus deiner Freundesliste sprechen.",
    empty_list_text: "Du hast noch keine Freunde. Füge neue Freunde hinzu.",
  },
  NewGroup: {
    header_title: "Neue Gruppe",
    avatar_select_label: "Profilbild auswählen",
    avatar_select_tip:
      "Wir empfehlen ein Bild mit 600x600 Pixeln und maximal 5 MB",
    avatar_selected: "🖼 Dieses Foto ist perfekt!",
    categories: {
      TECHNOLOGY: "Technologie",
      EDUCATION: "Bildung",
      ENTERTAINMENT: "Unterhaltung",
      SPORTS: "Sport",
      BUSINESS: "Geschäft",
      HEALTH_AND_WELLNESS: "Gesundheit und Wellness",
      ART_AND_CULTURE: "Kunst und Kultur",
      TRAVEL: "Reisen",
      FOOD_AND_DRINK: "Essen und Trinken",
      GAMING: "Gaming",
      MUSIC: "Musik",
      SCIENCE: "Wissenschaft",
      FASHION_AND_BEAUTY: "Mode und Schönheit",
      FINANCE: "Finanzen",
      MARKETING: "Marketing",
      PHOTOGRAPHY: "Fotografie",
      PETS_AND_ANIMALS: "Haustiere und Tiere",
      REAL_ESTATE: "Immobilien",
      AUTOMOTIVE: "Automobil",
      DIY_AND_CRAFTS: "DIY und Handwerk",
      BOOKS_AND_LITERATURE: "Bücher und Literatur",
      PARENTING_AND_FAMILY: "Elternschaft und Familie",
      POLITICS_AND_SOCIETY: "Politik und Gesellschaft",
      RELIGION_AND_SPIRITUALITY: "Religion und Spiritualität",
      CAREER_AND_NETWORKING: "Karriere und Networking",
      FILM_AND_TV: "Film und TV",
      FITNESS_AND_BODYBUILDING: "Fitness und Bodybuilding",
      OTHER: "Sonstiges",
    },
    limit: {
      title: "Du hast das Limit von {{count}} Gruppen erreicht!",
      subtitle:
        "Dieses Limit existiert, damit jeder seine Community in Saturn Chat erstellen kann und Spam vermieden wird.",
      premium:
        "Du kannst auch ein Star werden und bis zu {{groups}} Gruppen mit je {{participants}} Teilnehmern erstellen.",
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
          placeholder: "mit Komma trennen",
        },
        category: {
          label: "Gruppenkategorie",
          placeholder: "Kategorie auswählen",
        },
        public: "Öffentlich",
        private: "Privat",
      },
      create_group: "Gruppe erstellen",
    },
    star: "Star werden",
  },
  Settings: {
    header_title: "Einstellungen",
    alerts: {
      sign_out: {
        title: "😥 Möchtest du wirklich gehen?",
        subtitle:
          "Beim Abmelden erhältst du keine Benachrichtigungen für neue Nachrichten oder Einladungen.",
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
      dark_theme: "Dunkelmodus",
      notifications: "Benachrichtigungen",
    },
    account: {
      title: "Konto & Datenschutz",
      edit_password: "Passwort ändern",
      security: {
        require_on_open: "Passwort beim Öffnen der App verlangen",
        anti_print: "Screenshots blockieren",
        interval: "Authentifizierung anfordern",
        interval_title: "Authentifizierung anfordern",
        interval_content: "Wählen Sie, wann die Sperre angefordert werden soll.",
        unavailable_title: "Lokale Authentifizierung nicht verfügbar",
        unavailable_content:
          "Registrieren Sie eine Biometrie oder ein Gerätepasswort, um diese Option zu aktivieren.",
        unlock_prompt: "Saturn Chat entsperren",
        unlock_message: "Authentifizieren Sie sich, um Saturn Chat zu öffnen",
        authenticating: "Auf Authentifizierung warten",
        unlock_button: "Entsperren",
        cancel: "Abbrechen",
        screenshot_blocked_title: "Screenshot blockiert",
        screenshot_blocked_content: "Diese Unterhaltung erlaubt keine Screenshots.",
        intervals: {
          0: "Bei jedem Öffnen",
          5: "Alle 5 Minuten",
          15: "Alle 15 Minuten",
          30: "Alle 30 Minuten",
          60: "Jede Stunde",
        },
      },
    },
    about: {
      developer_options: "Entwickleroptionen",
      use_dev_api: "Entwickler-API nutzen",
      title: "Über",
      guidelines: "Community-Richtlinien",
      privacy_policy: "Datenschutzrichtlinie",
      feedback: "Feedback senden",
    },
    sign_out: "Abmelden",
  },
  SendFeedback: {
    title: "Feedback senden",
    feedback_type: {
      bug: "Fehler (Bugs)",
      suggestion: "Vorschläge",
      others: "Sonstiges",
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
    title: "Derzeit keine Ergebnisse",
    subtitle:
      "Versuche nach einem Gruppennamen, einem Tag oder einem Benutzernamen zu suchen.",
    loading: {
      title: "Suchen...",
      subtitle: "Das kann einen Moment dauern",
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
    header_title: "Einladungen & Anfragen",
    subtitle:
      "Verwalte erhaltene Gruppeneinladungen und Freundschaftsanfragen.",
    empty_text: "Keine Einladungen oder Freundschaftsanfragen vorhanden.",
    toasts: {
      invite_accept: "Einladung angenommen!",
      invite_reject: "Einladung abgelehnt :(",
      request_accept: "Freundschaftsanfrage angenommen!",
      request_reject: "Freundschaftsanfrage abgelehnt",
    },
  },
  Profile: {
    friends: "Freunde",
    participating: "Mitglied in",
  },
  EditProfile: {
    header_title: "Profil bearbeiten",
    switch_avatar: "Avatar ändern",
    searching: "Suchen...",
    errors: {
      "400": "Benutzername entspricht nicht den Richtlinien",
      "404": "Benutzername wurde nicht angegeben",
      "1000": "Benutzername konnte nicht abgerufen werden",
      unavailable: "Benutzername ist nicht verfügbar",
    },
    toasts: {
      updated: "Profil aktualisiert",
      update_avatar: "Avatar wird aktualisiert...",
      updated_avatar: "Avatar aktualisiert",
      photo_permission:
        "Wir benötigen Zugriff auf deine Fotos, um deinen Avatar zu ändern!",
    },
    labels: {
      nickname: "Benutzername",
      name: {
        label: "Name",
        placeholder: "max. 100 Zeichen",
      },
      bio: {
        label: "Status/Bio",
        placeholder: "max. 100 Zeichen",
      },
    },
    done: "Fertig",
  },
  SwitchLanguage: {
    header_title: "Sprachen",
    title: "So funktionieren Sprachen",
    subtitle:
      "Die Sprache der App richtet sich nach deinen Geräteeinstellungen.\n\nUm sie zu ändern, passe einfach die Sprache in deinen Systemeinstellungen an.",
  },
  SwitchPassword: {
    header_title: "Passwort ändern",
    toasts: {
      updated_pass: "Passwort erfolgreich geändert!",
      incorrect_pass: "Aktuelles Passwort falsch!",
      error_pass: "Fehler beim Ändern des Passworts!",
    },
    labels: {
      current_password: "Aktuelles Passwort",
      new_password: {
        label: "Neues Passwort",
        error: "Passwort entspricht nicht den Sicherheitsstandards",
        info: "Dein Passwort muss mindestens 8 Zeichen (mind. 1 Großbuchstabe), mindestens 1 Zahl und 1 Symbol enthalten.",
      },
      confirm_pass: {
        label: "Neues Passwort bestätigen",
        error: "Die Passwörter stimmen nicht überein",
      },
    },
    done: "Passwort ändern",
  },
  Premium: {
    header_title: "Werde Teil der Sternenbilder!",
    be_star: "Werde ein Star!",
    title: "Sichere dir tolle Vorteile in Saturn Chat zu einem fairen Preis!",
    subtitle:
      "Nutze alle Funktionen wie größere Dateien, mehr Gruppen, Werbefreiheit und vieles mehr!",
    free_month: "Jetzt abonnieren und 1 Monat gratis testen!",
    buy_button: "Ab {{price}} erhalten",
    vantages_title: "Vorteile des Star-Plans:",
    advantages: {
      0: "Vollständig werbefrei!",
      1: "Erhöhe den Speicher für Datei-Uploads um das {{multiple}}-fache: von {{default}} MB auf unglaubliche {{premium}} MB.",
      2: "Erhöhe das Gruppenlimit: von {{default}} auf {{premium}} Gruppen.",
      3: "Erhöhe die maximale Teilnehmerzahl deiner Gruppen: von {{default}} auf {{premium}} Teilnehmer.",
      4: "Erhöhe die Anzahl der Personen pro Anruf: von {{default}} auf {{premium}} Teilnehmer.",
      5: "Erhalte ein exklusives Abzeichen neben deinem Namen!",
      6: "Längere Nachrichten schreiben? Erhöhe das Zeichenlimit von {{default}} auf {{premium}} Zeichen!",
      7: "Unterstütze die Entwicklung der App und erhalte Updates schneller ❤",
      8: "Exportiere deine Gruppen-Nachrichten im CSV-Format.",
    },
  },
  ManagePremium: {
    header_title: "Star-Plan verwalten",
    alerts: {
      cancel_plan: {
        title: "❗ Bist du sicher?",
        content:
          "Wenn du dein Abonnement kündigst, verlierst du ALLE Vorteile. ES GIBT KEINE RÜCKERSTATTUNG FÜR DEN BEREITS BEZAHLTEN MONAT (du kannst die Vorteile jedoch bis zum Verlängerungsdatum nutzen).",
        ok_text: "Plan behalten",
        cancel_text: "Plan kündigen",
      },
    },
    title: "Verwalte deinen Star-Plan",
    subtitle:
      "Hier findest du Details zu deinem Abonnement wie Verlängerungsdatum und Zahlungsstatus.",
    plan_labels: {
      plan: "Abonnement-Plan:",
      status: "Abonnement-Status",
      start: "Kaufdatum",
      expire: "Verlängerungsdatum",
      resume: "Rückkehrdatum",
    },
    payments: {
      0: "Ausstehend",
      1: "Bezahlt",
      2: "Testphase",
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
    title: "Fast geschafft!",
    subtitle:
      "Wähle nun zwischen monatlicher, vierteljährlicher oder jährlicher Zahlung.",
    monthly: "Monatlich",
    quarterly: "Vierteljährlich",
    yearly: "Jährlich",
    button_text: "Diesen Plan wählen!",
    finished: {
      success_title: "Abonnement erfolgreich!",
      error_title: "Abonnement konnte nicht abgeschlossen werden",
      success_subtitle:
        "Du kannst nun alle Vorteile des Star-Plans nutzen! Es kann einige Minuten dauern, bis alles freigeschaltet ist.",
      error_subtitle:
        "Deine Zahlung wurde möglicherweise abgelehnt oder storniert. Versuche es später erneut.",
    },
  },
  Call: {
    header_title: "Gruppenanruf",
    participants_count: "{{count}} im Anruf",
    participants_modal: {
      title: "Teilnehmer",
    },
    view_all: "Alle anzeigen",
    floating_button: "Zurück zum Anruf",
    alert_ok: "Verstanden",
    you: "Du",
    notification: {
      channel_name: "Laufende Anrufe",
      title: "Anruf läuft",
      body: "Tippe, um zu Saturn Chat zurückzukehren",
    },
    events: {
      inactivity_closed: "Der Anruf wurde wegen Inaktivität beendet.",
      room_closed: "Dieser Anrufraum wurde geschlossen.",
    },
    errors: {
      default: {
        title: "Anruf konnte nicht betreten werden",
        content: "Beim Zugriff auf den Anruf ist ein Fehler aufgetreten.",
      },
      access_blocked: {
        title: "Zugriff blockiert",
        content: "Du bist in dieser Gruppe gesperrt und kannst nicht am Anruf teilnehmen.",
      },
      group_invalid: {
        title: "Ungültige Gruppe",
        content: "Du gehörst nicht zu dieser Gruppe oder das Gespräch ist nicht mehr verfügbar.",
      },
      direct_limit: {
        title: "Zwei-Personen-Anruf",
        content: "Dieser Direktanruf darf nur die beiden Teilnehmer der Unterhaltung enthalten.",
      },
      participant_limit: {
        title: "Anruflimit",
      },
      inactivity_timeout: {
        title: "Anruf beendet",
        content: "Der Anruf wurde wegen Inaktivität beendet.",
      },
      call_closed: {
        title: "Anruf beendet",
        content: "Dieser Anrufraum wurde geschlossen.",
      },
      direct_not_part: {
        title: "Ungültige Teilnahme",
        content: "Du bist nicht Teil dieses Direktanrufs.",
      },
    },
  },
  Chat: {
    alerts: {
      file_size: {
        title: "😱 Sehr große Datei!",
        content:
          "Ich kann keine so große Datei hochladen; versuche eine Datei bis zu {{amount}} MB zu senden!",
        extra_button_text: "Star-Plan holen",
      },
      same_file: {
        title: "🤔 Das kenne ich schon",
        content: "Du hast diese Datei bereits zum Senden ausgewählt!",
      },
      mic_perm: {
        title: "🙂 Bitte",
        content:
          "Ich benötige Zugriff auf dein Mikrofon, um Sprachnachrichten aufzunehmen.",
      },
    },
    toasts: {
      sending_voice: "Sprachnachricht wird gesendet...",
    },
    type_message: "Nachricht schreiben...",
    drop_send: "Zum Senden loslassen",
    sent: "Gesendet",
    limit_char: "Limit von {{count}} Zeichen erreicht!",
    no_send_message:
      " Du kannst in dieser Gruppe keine Nachrichten senden, aber du kannst sie lesen und Benachrichtigungen erhalten.",
  },
  GroupConfig: {
    header_group_title: "Gruppenoptionen",
    header_chat_title: "Chat-Optionen",
    alerts: {
      error: {
        title: "Fehler",
        content: "Die Gruppeneinstellungen konnten nicht geladen werden.",
      },
      delete_group: {
        title: "⚠ Achtung, das ist gefährlich!",
        content:
          'Diese Aktion ist UNWIDERRUFLICH! Das Löschen der Gruppe "{{name}}" löscht alle Nachrichten und Dateien dauerhaft!',
        ok_text: "Löschen",
        cancel_text: "Abbrechen",
      },
      exit_group: {
        title: "😥 Möchtest du wirklich austreten?",
        content:
          "Beim Verlassen bleiben deine Nachrichten erhalten, aber du erhältst keine Benachrichtigungen mehr.",
        ok_text: "Austreten",
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
          "Inhaber benachrichtigen, wenn neue Mitglieder beitreten",
        accepting_new_users: "Beitritt neuer Mitglieder erlauben",
        max_participants: "Maximale Teilnehmerzahl (0 für unbegrenzt)",
        minimum_role_for_send_message:
          "Mindestrolle zum Senden von Nachrichten",
        roles: {
          participant: "Teilnehmer",
          moderator: "Moderator",
          manager: "Manager",
          admin: "Administrator",
        },
      },
      participant: {
        send_notifications: "Benachrichtigungen für neue Nachrichten erhalten",
        anti_print: "Screenshots blockieren",
        title: "Teilnehmereinstellungen",
      },
      danger_zone: {
        title: "Gefahrenzone",
        delete_group: "Gruppe löschen",
        exit_group: "Gruppe verlassen",
      },
    },
    toasts: {
      submit_success: "Einstellungen erfolgreich geändert",
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
    last_seen: "Zuletzt gesehen am {{date}}",
    owner: "Inhaber",
  },
  Participant: {
    title: "Teilnehmeroptionen",
    view_profile: "Profil anzeigen",
    change_role: "Rolle ändern",
    kick: "Kicken",
    ban: "Teilnehmer sperren (Ban)",
  },
  PunishParticipant: {
    title: "Bist du sicher?",
    desc_kick:
      'Du bist dabei, den Teilnehmer "{{userName}}" aus der Gruppe "{{groupName}}" zu entfernen. Bist du sicher?',
    desc_ban:
      'Du bist dabei, den Teilnehmer "{{userName}}" aus der Gruppe "{{groupName}}" zu sperren. Bist du sicher?',
    notify_text: "Teilnehmer über Bestrafung benachrichtigen",
    confirm_text_kick: "Ja, jetzt kicken!",
    confirm_text_ban: "Ja, jetzt sperren!",
    cancel_text: "Nein, Abbrechen",
    toasts: {
      success: "Benutzer erfolgreich bestraft!",
      error: "Benutzer konnte nicht bestraft werden.",
    },
  },
  ChangeRole: {
    header_title: "Rolle ändern",
    title: "Rollen",
    subtitle:
      "Mitglieder mit Spezialrollen können Gruppenfunktionen verwalten. Vergib wichtige Rollen nur an vertrauenswürdige Personen.",
    roles: {
      participant: {
        name: "Teilnehmer",
        desc: "Diese Rolle verleiht keine besonderen Rechte.",
      },
      mod: {
        name: "Moderator",
        desc: "Moderatoren sorgen für Sicherheit und Ordnung in der Gruppe.",
      },
      manager: {
        name: "Manager",
        desc: "Manager helfen, die Gruppe zu organisieren und neue Mitglieder zu gewinnen.",
      },
      admin: {
        name: "Administrator",
        desc: "Gewährt dem Teilnehmer dieselben Rechte wie dem Gruppeninhaber.",
      },
    },
    permissions: {
      create_invites: "Einladungen für neue Benutzer erstellen",
      punish_members: "Mitglieder bei Regelverstoß bestrafen",
      manage_roles: "Rollen verwalten",
      manage_messages: "Nachrichten verwalten (z. B. löschen)",
      edit_group: "Gruppeninfos bearbeiten (Name, Bild, Beschreibung)",
      delete_group: "Gruppe löschen",
    },
    toasts: {
      success: "Benutzerrolle erfolgreich geändert!",
      error: "Fehler beim Ändern der Rolle.",
    },
  },
  FriendsManager: {
    alerts: {
      unfriend: {
        title: "⚠️ Freundschaft beenden?",
        content:
          "Wenn du diesen Benutzer entfernst, könnt ihr keine Direktnachrichten mehr austauschen. Alle bisherigen Nachrichten werden gelöscht.",
        ok_text: "Freundschaft beenden",
      },
    },
    header_title: "Freunde verwalten",
  },
  InviteUsers: {
    header_title: "Einladen",
    empty_title:
      "Keine Freunde zum Einladen. Versuche einen Einladungslink zu teilen.",
    title: "Gruppeneinladungen",
    subtitle: "Erstelle und verwalte Einladungen mit unserem Manager.",
    new_invite_text: "Einladungen verwalten",
    friends_invite_title: "Freunde einladen",
    friends_invite_subtitle:
      "Hier erscheinen nur Freunde, die noch nicht in der Gruppe sind.",
    invite: "Einladen",
    invited: "Eingeladen",
    toasts: {
      success: "Einladung erfolgreich gesendet!",
      error: "Freund konnte nicht eingeladen werden!",
    },
  },
  NewInvites: {
    header_title: "Einladungen erstellen",
    title: "Einladung generieren",
    subtitle: "Du kannst Einladungen mit folgenden Einstellungen erstellen:",
    permanent: "Dauerhafte Einladung",
    usage_unlimited: "Unbegrenzte Nutzungen",
    usage_one: "Maximal {{count}} Mal nutzen",
    usage_other: "Maximal {{count}} Mal nutzen",
    expire_one: "Läuft in {{count}} Tag ab",
    expire_other: "Läuft in {{count}} Tagen ab",
    day_one: "Tag",
    day_other: "Tage",
    active_invites: "Aktive Einladungen",
    generate: "Generieren",
    expire_in: "Läuft ab in ",
    usage_amount_one: "{{count}} Mal genutzt von ",
    usage_amount_other: "{{count}} Mal genutzt von ",
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
      avatar_permission: "Zugriff auf Fotos erforderlich!",
      updating: "Avatar wird aktualisiert...",
      updated: "Avatar aktualisiert",
    },
    header_title: "Gruppe bearbeiten",
    switch_avatar: "Avatar ändern",
    inputs: {
      name: "Name",
      desc: "Beschreibung",
      public: "Öffentlich machen",
    },
    done: "Fertig",
  },
  GroupInfos: {
    join: "Beitreten",
    joined: "Mitglied",
    participants_one: "Teilnehmer",
    participants_other: "Teilnehmer",
    category: "Kategorie",
    tags: "Gruppen-Tags",
    desc: "Beschreibung",
    no_desc: "Diese Gruppe hat keine Beschreibung.",
    no_tags: "Keine Tags definiert",
    accepting_participants_text:
      "Diese Gruppe hat die maximale Teilnehmerzahl erreicht.",
    toasts: {
      error: "Beitritt zur Gruppe fehlgeschlagen!",
    },
  },
  Report: {
    header_title: "Melden",
    title: "Meldung einreichen",
    subtitle:
      "Etwas Unangemessenes gefunden? Reiche eine Meldung ein, damit wir sie anonym prüfen können.",
    types: {
      SPAM: "Spam und/oder unerwünschte Nachrichten",
      VIOLENCE: "Gewalttätige Inhalte, Suizidaufforderungen oder Schusswaffen",
      SEXUAL: "Sexuelle Inhalte, Pädophilie oder Kindesmissbrauch",
      BULLYING: "Mobbing oder Belästigung von Benutzern",
      RACISM: "Hassrede, Rassismus, Fremdenfeindlichkeit usw.",
      SCAM: "Betrug, gefälschte Gewinnspiele, Erpressung usw.",
      FAKE_ACCOUNT: "Gefälschte Inhalte oder Identitätsdiebstahl",
      DMCA: "Urheberrechtlich geschützte Inhalte",
      OTHER: "Sonstiges",
    },
    done: "Melden",
    sent: "Meldung erfolgreich eingereicht!",
  },
};
