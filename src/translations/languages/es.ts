export const es = {
  Components: {
    Ads: {
      remove_ad: "Eliminar anuncio",
    },
    GroupInvite: {
      participants: "participantes",
      join: "Unirse",
    },
    FriendActionButtons: {
      title: "quiere ser tu amigo",
      accept: "Aceptar",
      reject: "Rechazar",
    },
    AddFriendButton: {
      friends: "Amigos",
      requested: "Solicitud enviada",
      request: "Añadir a amigos",
    },
    Chat: {
      AudioPlayer: {},
      CurrentReplyingMessage: {
        file_amount_one: "archivo",
        file_amount_other: "archivos",
        replying_text: "Estás respondiendo a:",
      },
      FilePreview: {
        alerts: {
          download: {
            title: "❗ Ten mucho cuidado",
            content:
              "¿Estás seguro de que quieres descargar el archivo? ¡Los archivos maliciosos pueden dañar tu teléfono!\n\n📁 Nombre del archivo: {{name}}",
            ok_text: "Descargar",
            cancel_text: "Cancelar",
          },
        },
      },
      Message: {
        toasts: {
          copied_message: "Mensaje copiado",
        },
        alerts: {
          open_link: {
            title: "⚠ Cuidado, puede ser peligroso",
            content:
              "¿Estás seguro de que deseas acceder a este enlace? No podemos garantizar tu seguridad al acceder a él.\n\n{{url}}",
            ok_text: "Acceder",
            cancel_text: "No",
          },
        },
        options: {
          reply: "Responder",
          copy: "Copiar",
          show_original_message: "Mostrar mensaje original",
          translate_message: "Traducir mensaje",
          original_restored: "Mensaje original restaurado.",
          already_in_lang: "El mensaje ya está en tu idioma.",
          translated_success: "¡Mensaje traducido!",
          not_identified_lang: "No se pudo identificar el idioma.",
          part_opt: "Opciones del participante",
          delete: "Eliminar",
          report: "Denunciar mensaje",
        },
      },
      RecordingAudio: {
        recording: "Grabando",
      },
      ReplyingMessage: {
        read_more: "Leer más",
        read_less: "Leer menos",
        replying: "Respondiendo a:",
        voice_message: "🎤 Mensaje de voz",
        files_one: "archivo",
        files_other: "archivos",
      },
      InviteInMessage: {
        invalid_invite_title: "🚫 Invitación inválida",
        invalid_invite_subtitle:
          "¡La invitación puede haber caducado, sido eliminada o alcanzado el límite máximo de usos!",
        invite_title: "Invitación para:",
        invite_screen_title: "Has sido invitado(a) al grupo:",
        no_desc: "Sin descripción",
        joined_text: "¡Ya te has unido!",
        join_text: "Unirse al grupo",
        toasts: {
          joined: "¡Te has unido al grupo '{{name}}'!",
          error: "No se pudo usar la invitación",
        },
      },
      LinkPreview: {
        watch_text: "Toca aquí para ver",
        link_copied: "Enlace copiado",
      },
      Typing: {
        typing_user_one: "está ",
        typing_user_other: "están ",
        typing: "escribiendo",
        many: "Varios usuarios",
      },
    },
    Modals: {
      EmblemModal: {
        title: "Insignia genial, ¿verdad?",
        content:
          "Se otorga a personas muy especiales que apoyan a Saturn Chat con el plan Star.",
        premium_text:
          "¿Quieres tener una igual? ¡Entonces únete a la constelación!",
        be_star: "Obtener Star",
      },
    },
    Alert: {
      cancel: "Cancelar",
    },
  },
  OnBoarding: {
    done: "Empezar",
    skip: "Omitir",
    pages: {
      0: {
        title: "¡Bienvenido a Saturn Chat!",
        subtitle:
          "Aquí encontrarás una enorme variedad de grupos (o podrás crear uno a tu manera).",
      },
      1: {
        title: "¡Envía mensajes con facilidad!",
        subtitle:
          "Con unos pocos clics ya puedes enviar y recibir mensajes con fotos, videos e incluso mensajes de voz.",
      },
      2: {
        title: "¡Estás seguro!",
        subtitle:
          "¡Aquí se preserva tu privacidad y tus datos no serán vendidos a nadie!",
      },
      3: {
        title: "¡Sé una Star!",
        subtitle:
          "Cuando estés listo, ve al menú de configuración, obtén el plan Star y aprovecha Saturn Chat al máximo.",
      },
    },
  },
  Auth: {
    Home: {
      title: "¿Empezamos?",
      subtitle: "¡Inicia sesión o crea tu cuenta para comenzar a usar la aplicación!",
      login: "Iniciar sesión",
      new_account: "Crear cuenta",
    },
    CreateAccount: {
      header_title: "Crear cuenta",
      avatar_select_label: "Elige una foto de perfil",
      avatar_select_tip:
        "💡 Recordatorio: debes seleccionar una imagen de máximo 5 MB.",
      avatar_selected: "🖼 ¡Esta foto es perfecta!",
      register_error:
        "No se pudo crear la cuenta. Posiblemente el correo electrónico ya esté en uso; intenta iniciar sesión.",
      labels: {
        name: "Nombre",
        email: {
          label: "Correo electrónico",
          error: "Este correo electrónico no es válido",
        },
        password: {
          label: "Ingresa una contraseña",
          error: "La contraseña no sigue los estándares de seguridad",
          info: "Tu contraseña debe contener al menos 8 caracteres (incluyendo al menos 1 letra mayúscula), al menos 1 número y 1 símbolo.",
        },
        password_again: {
          label: "Confirma tu contraseña",
          error: "Las contraseñas no coinciden",
        },
      },
      register_button: "Crear cuenta",
      consent: {
        guidelines: "Directrices de la Comunidad",
        privacy_policy: "Política de Privacidad",
        line_0: 'Al hacer clic en "Crear cuenta" aceptas nuestras',
        line_1: "y también nuestra",
      },
    },
    Login: {
      header_title: "Inicia sesión",
      title: "Hola,\nBienvenido de nuevo",
      login_error:
        "No se pudo iniciar sesión. Verifica tus datos o crea una cuenta.",
      email: "Correo electrónico",
      password: "Contraseña",
      forgot_password: "¿Olvidaste tu contraseña?",
      login_button: "Entrar",
      register_button: "¿Eres nuevo aquí? ¡Crea una cuenta!",
    }
  },
  TabBar: {
    groups: "Grupos",
    friends: "Amigos",
    new_group: "Nuevo grupo",
    settings: "Opciones",
  },
  Home: {
    header_title: "Grupos",
    quick_access: "Acceso rápido",
    empty_list: {
      title: "¿Qué tal empezar uniéndote a un grupo?",
      search_text: "Accede a la pestaña",
      line_0: "y busca algo o únete a nuestro",
      official_group: "Grupo Oficial",
    },
    groups_list: {
      title: "Acceder a los grupos",
      subtitle_one: "Estás en {{count}} grupo",
      subtitle_other: "Estás en {{count}} grupos",
    },
  },
  Friends: {
    header_title: "Amigos",
    title: "Mensajes directos",
    subtitle:
      "Envía mensajes privados a tus amigos. Solo puedes hablar con personas de tu lista de amigos.",
    empty_list_text: "No tienes ningún amigo. Añade nuevos amigos.",
  },
  NewGroup: {
    header_title: "Nuevo grupo",
    avatar_select_label: "Elige una foto de perfil",
    avatar_select_tip:
      "Recomendamos una imagen de 600x600 píxeles y máximo 5 MB",
    avatar_selected: "🖼 ¡Esta foto es perfecta!",
    limit: {
      title: "¡Has alcanzado el límite de {{count}} grupos!",
      subtitle:
        "Este límite se establece para que todos puedan crear sus comunidades en Saturn Chat y también para evitar problemas como el spam.",
      premium:
        "También puedes convertirte en una Star y crear hasta {{groups}} grupos con {{participants}} participantes en cada uno.",
    },
    form: {
      labels: {
        name: {
          label: "Nombre del grupo",
          placeholder: "máx. 100 caracteres",
        },
        desc: {
          label: "Describe tu grupo",
          placeholder: "máx. 500 caracteres",
        },
        tags: {
          label: "Etiquetas del grupo",
          placeholder: "separar por comas",
        },
        public: "Público",
        private: "Privado",
      },
      create_group: "Crear grupo",
    },
    star: "Convertirse en Star",
  },
  Settings: {
    header_title: "Configuración",
    alerts: {
      sign_out: {
        title: "😥 ¿Realmente quieres salir?",
        subtitle:
          "Al salir, no recibirás notificaciones de nuevos mensajes, invitaciones ni nada relacionado.",
        ok_text: "Salir",
        cancel_text: "Cancelar",
      },
    },
    general: {
      title: "General",
      star: "Sé una Star",
      manage_star: "Administrar plan Star",
      edit_profile: "Editar perfil",
      languages: "Idiomas",
      dark_theme: "Modo Oscuro",
      notifications: "Notificaciones",
    },
    account: {
      title: "Cuenta y privacidad",
      edit_password: "Cambiar contraseña",
    },
    about: {
      developer_options: "Opciones de Desarrollador",
      use_dev_api: "Usar API de Desarrollo",
      title: "Acerca de",
      guidelines: "Directrices de la Comunidad",
      privacy_policy: "Política de Privacidad",
      feedback: "Enviar Comentarios",
    },
    sign_out: "Cerrar sesión",
  },
  SendFeedback: {
    title: "Enviar Comentarios",
    feedback_type: {
      bug: "Errores",
      suggestion: "Sugerencias",
      others: "Otros",
    },
    labels: {
      message: "Mensaje",
    },
    done: "Enviar",
    sent: "¡Comentarios enviados con éxito!",
  },
  Search: {
    header_title: "Explorar",
    input_placeholder: "¿Qué buscas hoy?",
    title: "Sin resultados en este momento",
    subtitle:
      "Intenta buscar el nombre de algún grupo, etiqueta relacionada o nombre de usuario.",
    loading: {
      title: "Buscando...",
      subtitle: "Esto puede tardar un poco",
    },
    participants_one: "participante",
    participants_other: "participantes",
    filters: {
      all: "Todos",
      users: "Usuarios",
      groups: "Grupos",
    },
  },
  InviteManager: {
    header_title: "Invitaciones y solicitudes",
    subtitle: "Administra las invitaciones y solicitudes de amistad recibidas.",
    empty_text:
      "No hay invitaciones a grupos ni solicitudes de amistad. Vuelve más tarde.",
    toasts: {
      invite_accept: "¡Invitación aceptada!",
      invite_reject: "Invitación rechazada :(",
      request_accept: "¡Solicitud aceptada con éxito!",
      request_reject: "Solicitud rechazada con éxito",
    },
  },
  Profile: {
    friends: "Amigos",
    participating: "Participando",
  },
  EditProfile: {
    header_title: "Editar perfil",
    switch_avatar: "Cambiar avatar",
    toasts: {
      updated: "Perfil actualizado",
      update_avatar: "Actualizando avatar...",
      updated_avatar: "Avatar actualizado",
      photo_permission:
        "¡Necesitamos permiso para acceder a tus fotos y poder cambiar tu avatar!",
    },
    labels: {
      name: {
        label: "Nombre",
        placeholder: "máx. 100 caracteres",
      },
      bio: {
        label: "Sobre mí",
        placeholder: "máx. 100 caracteres",
      },
    },
    done: "Listo",
  },
  SwitchLanguage: {
    header_title: "Idiomas",
    title: "Entiende cómo funcionan los idiomas",
    subtitle:
      "El idioma de la aplicación está definido por el valor predeterminado de tu dispositivo.\n\nPara cambiarlo, solo tienes que acceder a la configuración de tu teléfono y realizar el cambio; la aplicación se actualizará automáticamente.",
  },
  SwitchPassword: {
    header_title: "Cambia tu contraseña",
    toasts: {
      updated_pass: "¡Contraseña cambiada con éxito!",
      incorrect_pass: "¡Contraseña actual incorrecta!",
      error_pass: "¡Error al cambiar la contraseña!",
    },
    labels: {
      current_password: "Contraseña actual",
      new_password: {
        label: "Nueva contraseña",
        error: "La contraseña no sigue los estándares de seguridad",
        info: "Tu contraseña debe contener al menos 8 caracteres (incluyendo al menos 1 letra mayúscula), al menos 1 número y 1 símbolo.",
      },
      confirm_pass: {
        label: "Confirma la nueva contraseña",
        error: "Las contraseñas no coinciden",
      },
    },
    done: "Cambiar contraseña",
  },
  Premium: {
    header_title: "¡Únete a la constelación!",
    be_star: "¡Sé una Star!",
    title:
      "¡Obtén ventajas y funciones increíbles en Saturn Chat a un precio asequible!",
    subtitle:
      "Aprovecha al máximo todas las funciones disponibles, como enviar archivos más grandes, crear más grupos, eliminar anuncios molestos y mucho más.",
    free_month: "¡Suscríbete ahora y obtén 1 mes gratis!",
    buy_button: "Obtener desde {{price}}",
    vantages_title: "Ventajas del plan Star:",
    advantages: {
      0: "¡Totalmente libre de anuncios molestos!",
      1: "Aumenta en {{multiple}}x el espacio para enviar archivos: de {{default}} MB a increíbles {{premium}} MB.",
      2: "Aumenta la cantidad de grupos que puedes crear: de {{default}} a {{premium}} grupos.",
      3: "Aumenta la cantidad de participantes que puedes tener en tus grupos: de {{default}} a {{premium}} participantes.",
      4: "¡Obtén una insignia exclusiva junto a tu nombre para presumir!",
      5: "¿Te gusta enviar textos largos? ¡Aumenta el límite de tus mensajes de {{default}} a maravillosos {{premium}} caracteres!",
      6: "Apoya el desarrollo de la aplicación y ayúdanos a traer novedades más rápido ❤",
      7: "Exporta los mensajes de tus grupos en formato CSV.",
    },
  },
  ManagePremium: {
    header_title: "Administrar plan Star",
    alerts: {
      cancel_plan: {
        title: "❗ ¿Estás seguro?",
        content:
          "Al cancelar tu suscripción, pierdes TODOS los beneficios otorgados por el plan. Además, NO RECIBIRÁS REEMBOLSO DEL MES YA PAGADO (pero podrás utilizar los beneficios hasta la fecha de renovación).",
        ok_text: "Mantener plan",
        cancel_text: "Cancelar plan",
      },
    },
    title: "Administra tu plan Star",
    subtitle:
      "Aquí puedes ver detalles sobre tu plan, como la fecha de renovación y el estado del pago. También puedes cancelar tu suscripción en cualquier momento desde aquí.",
    plan_labels: {
      plan: "Plan de suscripción:",
      status: "Estado de la suscripción",
      start: "Fecha de adquisición",
      expire: "Fecha de renovación",
      resume: "Fecha de retorno",
    },
    payments: {
      0: "Pendiente",
      1: "Pagado",
      2: "Prueba",
      3: "Plan actualizado",
    },
    periods: {
      0: "Mensual",
      1: "Trimestral",
      2: "Anual",
    },
    cancel_text: "Cancelar suscripción",
  },
  ChoosePlan: {
    header_title: "Elige tu plan",
    title: "¡Ya casi estamos!",
    subtitle:
      "Ahora debes elegir qué plan quieres. Puedes optar por mensual, trimestral o anual.",
    monthly: "Mensual",
    quarterly: "Trimestral",
    yearly: "Anual",
    button_text: "¡Quiero este!",
  },
  Chat: {
    alerts: {
      file_size: {
        title: "😱 ¡Qué archivo tan pesado!",
        content:
          "No puedo cargar algo tan grande; ¡intenta enviar un archivo de hasta {{amount}} MB!",
        extra_button_text: "Obtener plan Star",
      },
      same_file: {
        title: "🤔 Ya he visto esto antes",
        content: "¡Ya has elegido este archivo para ser enviado!",
      },
      mic_perm: {
        title: "🙂 Por favor",
        content:
          "Necesito permiso para usar tu micrófono, así podré grabar audios.",
      },
    },
    toasts: {
      sending_voice: "Enviando mensaje de voz...",
    },
    type_message: "Escribe tu mensaje...",
    drop_send: "Suelta para enviar",
    sent: "Enviado",
    limit_char: "¡Límite de {{count}} caracteres alcanzado!",
  },
  GroupConfig: {
    header_group_title: "Opciones del grupo",
    header_chat_title: "Opciones del chat",
    alerts: {
      delete_group: {
        title: "⚠ Cuidado, ¡esto es peligroso!",
        content:
          '¡Esta acción es IRREVERSIBLE! Al eliminar el grupo "{{name}}", también eliminarás todos los mensajes, archivos y cualquier otra cosa guardada en él.',
        ok_text: "Eliminar",
        cancel_text: "Cancelar",
      },
      exit_group: {
        title: "😥 ¿Seguro que quieres irte?",
        content:
          "Al salir del grupo, tus mensajes se mantendrán, pero no recibirás notificaciones de nuevos mensajes y necesitarás ser invitado(a) nuevamente para entrar (si el grupo es privado).",
        ok_text: "Salir",
      },
    },
    options: {
      general: {
        title: "Generales",
        participants: "Participantes",
        invite_users: "Invitar usuarios",
        edit_group: "Editar grupo",
        details: "Ver detalles",
        notify_new_participants:
          "Avisar al dueño cuando nuevos participantes se unan al grupo",
        accepting_new_users: "Aceptar la entrada de nuevos participantes",
        max_participants:
          "Cantidad máxima de participantes (deja 0 para ilimitado)",
        minimum_role_for_send_message:
          "Rol mínimo para enviar mensajes en el grupo (los roles inferiores al seleccionado no podrán enviar mensajes)",
        roles: {
          participant: "Participante",
          moderator: "Moderador",
          manager: "Gerente",
          admin: "Administrador",
        },
      },
      participant: {
        send_notifications: "Recibir notificaciones de nuevos mensajes",
      },
      danger_zone: {
        title: "Zona de peligro",
        delete_group: "Eliminar grupo",
        exit_group: "Salir del grupo",
      },
    },
  },
  Participants: {
    header_title_one: "{{count}} Participante",
    header_title_other: "{{count}} Participantes",
    title: "Todos los participantes",
    created: "Creado el {{date}}",
    joined: "Se unió el {{date}}",
    online: "En línea",
    last_seen: "Visto por última vez el {{date}}",
    owner: "Dueño",
  },
  Participant: {
    title: "Opciones del participante",
    view_profile: "Ver perfil",
    change_role: "Cambiar rol",
    kick: "Expulsar",
    ban: "Banear participante",
  },
  PunishParticipant: {
    title: "¿Estás seguro?",
    desc_kick:
      'Estás a punto de expulsar al participante "{{userName}}" del grupo "{{groupName}}". ¿Estás seguro de tu elección?',
    desc_ban:
      'Estás a punto de banear al participante "{{userName}}" del grupo "{{groupName}}". ¿Estás seguro de tu elección?',
    notify_text: "Notificar al participante sobre el castigo",
    confirm_text_kick: "¡Sí, expulsar ahora!",
    confirm_text_ban: "¡Sí, banear ahora!",
    cancel_text: "No, cambié de opinión",
    toasts: {
      success: "¡Usuario castigado con éxito!",
      error: "No se pudo castigar al usuario. Inténtalo de nuevo.",
    },
  },
  ChangeRole: {
    header_title: "Cambiar rol",
    title: "Roles",
    subtitle:
      "Los miembros con roles especiales pueden tener control sobre varias funciones del grupo (como administrar roles e invitaciones, editar, etc.). Da roles importantes solo a personas en las que confíes.",
    roles: {
      participant: {
        name: "Participante",
        desc: "Este rol no otorga poderes especiales al participante.",
      },
      mod: {
        name: "Moderador",
        desc: "Los moderadores son los que se encargan de la seguridad del grupo.",
      },
      manager: {
        name: "Gerente",
        desc: "Los gerentes ayudan a organizar el grupo y a traer nuevos usuarios.",
      },
      admin: {
        name: "Administrador",
        desc: "Permite que el participante tenga los mismos poderes que el dueño del grupo.",
      },
    },
    permissions: {
      create_invites: "Crear invitaciones para llamar a nuevos usuarios",
      punish_members: "Castigar a los participantes que infrinjan las reglas",
      manage_roles: "Administrar roles",
      manage_messages: "Administrar mensajes (como eliminarlos)",
      edit_group: "Editar información del grupo (nombre, avatar y descripción)",
      delete_group: "Eliminar el grupo",
    },
    toasts: {
      success: "¡Rol del usuario cambiado con éxito!",
      error: "Error al cambiar rol. Inténtalo de nuevo.",
    },
  },
  FriendsManager: {
    alerts: {
      unfriend: {
        title: "⚠️ ¿Deseas deshacer la amistad?",
        content:
          "Si eliminas a este usuario de la lista de amigos, ya no podrás intercambiar mensajes directos con él. Todos los mensajes entre ustedes se eliminarán para ambos.",
        ok_text: "Deshacer amistad",
      },
    },
    header_title: "Administrar amigos",
  },
  InviteUsers: {
    header_title: "Invitar",
    empty_title:
      "No hay amigos para invitar. Intenta compartir una invitación mediante enlaces.",
    title: "Invitaciones del grupo",
    subtitle:
      "Crea y administra todas las invitaciones del grupo a través de nuestro administrador.",
    new_invite_text: "Administrar invitaciones",
    friends_invite_title: "Invita a tus amigos",
    friends_invite_subtitle:
      "Solo los amigos que no están en el grupo aparecen aquí. Necesitarán aceptar la invitación para entrar.",
    invite: "Invitar",
    invited: "Invitado",
    toasts: {
      success: "¡Invitación enviada con éxito!",
      error: "¡No se pudo invitar a tu amigo!",
    },
  },
  NewInvites: {
    header_title: "Crear invitaciones",
    title: "Generar invitación",
    subtitle: "Puedes generar invitaciones con estas configuraciones:",
    permanent: "Invitación permanente",
    usage_unlimited: "Usos ilimitados",
    usage_one: "Usar como máximo {{count}} vez",
    usage_other: "Usar como máximo {{count}} veces",
    expire_one: "Caduca en {{count}} día",
    expire_other: "Caduca en {{count}} días",
    day: "Día",
    day_plural: "Días",
    active_invites: "Invitaciones activas",
    generate: "Generar",
    expire_in: "Caduca en ",
    usage_amount_one: "Ha sido usado {{count}} vez de ",
    usage_amount_other: "Ha sido usado {{count}} veces de ",
  },
  EditGroup: {
    toasts: {
      success: "¡Grupo editado con éxito!",
      avatar_permission: "¡Necesitamos permiso para acceder a tus fotos!",
      updating: "Actualizando avatar...",
      updated: "Avatar actualizado",
    },
    header_title: "Editar grupo",
    switch_avatar: "Cambiar avatar",
    inputs: {
      name: "Nombre",
      desc: "Descripción",
      public: "Hacer público",
    },
    done: "Listo",
  },
  GroupInfos: {
    join: "Unirse",
    joined: "Participando",
    participants_one: "Participante",
    participants_other: "Participantes",
    tags: "Etiquetas del grupo",
    desc: "Descripción",
    no_desc: "Este grupo no tiene una descripción.",
    no_tags: "Ninguna etiqueta definida",
    accepting_participants_text:
      "Este grupo ha alcanzado el número máximo de participantes.",
    toasts: {
      error: "¡No se pudo entrar al grupo!",
    },
  },
  Report: {
    header_title: "Denunciar",
    title: "Haz tu denuncia",
    subtitle:
      "¿Encontraste algo que no parece correcto? Realiza tu denuncia para que podamos analizar la situación y tomar las medidas adecuadas. No te preocupes, tu denuncia es totalmente anónima.",
    types: {
      SPAM: "Spam y/o mensajes no deseados",
      VIOLENCE:
        "Prácticas violentas, fomento del suicidio o exhibición de armas de fuego",
      SEXUAL: "Contenido sexual, pedofilia o abuso de menores",
      BULLYING: "Acoso o falta de respeto a otros usuarios",
      RACISM: "Discurso de odio, racismo, xenofobia y similares",
      SCAM: "Estafas, falsos sorteos, extorsión y similares",
      FAKE_ACCOUNT: "Contenido falso o intento de hacerse pasar por otra persona",
      DMCA: "Contenido protegido por derechos de autor",
      OTHER: "Otros",
    },
    done: "Denunciar",
    sent: "¡Denuncia realizada con éxito!",
  },
};