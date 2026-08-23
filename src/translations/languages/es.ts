export const es = {
  Components: {
    Ads: {
      remove_ad: "Quitar anuncio",
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
        file_amount: "archivo",
        file_amount_plural: "archivos",
        replying_text: "Estás respondiendo:",
      },
      FilePreview: {
        alerts: {
          download: {
            title: "❗ Mucho cuidado",
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
              "¿Estás seguro de que quieres acceder a este enlace? No podemos garantizar tu seguridad al acceder a él.\n\n{{url}}",
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
        replying: "Respondiendo:",
        voice_message: "🎤 Mensaje de voz",
        files: "archivo",
        files_plural: "archivos",
      },
      InviteInMessage: {
        invalid_invite_title: "🚫 Invitación inválida",
        invalid_invite_subtitle:
          " ¡La invitación puede haber expirado, haber sido eliminada o haber alcanzado el número máximo de usos!",
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
        typing_user: "está ",
        typing_user_plural: "están ",
        typing: "escribiendo",
        many: "Varios usuarios",
      },
    },
    Modals: {
      EmblemModal: {
        title: "Insignia genial, ¿verdad?",
        content:
          "Se le otorga a personas muy especiales que apoyan a Saturn Chat con el plan Star.",
        premium_text:
          "¿Quieres una igual? ¡Ven a formar parte de la constelación!",
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
          "Aquí encontrarás una enorme variedad de grupos (o podrás crear uno a tu gusto).",
      },
      1: {
        title: "¡Envía mensajes con facilidad!",
        subtitle:
          "Con solo unos clics ya puedes enviar y recibir mensajes con fotos, videos e incluso mensajes de voz.",
      },
      2: {
        title: "¡Estás seguro!",
        subtitle:
          "¡Aquí tu privacidad está preservada, tus datos no se venderán a nadie!",
      },
      3: {
        title: "¡Sé una Star!",
        subtitle:
          "Cuando estés listo, ve al menú de configuración, obtén el plan Star y ¡aprovecha al máximo Saturn Chat!",
      },
    },
  },
  Auth: {
    Home: {
      title: "¿Empezamos?",
      subtitle: "Accede o crea tu cuenta para comenzar a usar la aplicación.",
      login: "Iniciar sesión",
      new_account: "Crear cuenta",
    },
    CreateAccount: {
      header_title: "Crear cuenta",
      avatar_select_label: "Elige una foto de perfil",
      avatar_select_tip:
        "💡 Recuerda: Debes seleccionar una imagen de máximo 5MB.",
      avatar_selected: "🖼 ¡Esta foto está perfecta!",
      register_error:
        "No se pudo crear la cuenta, posiblemente el correo electrónico ya está en uso, intenta iniciar sesión.",
      labels: {
        name: "Nombre",
        email: {
          label: "Correo electrónico",
          error: "Este correo electrónico no es válido",
        },
        password: {
          label: "Escribe una contraseña",
          error: "La contraseña no sigue los estándares de seguridad",
          info: "Tu contraseña debe contener: mínimo 8 caracteres (al menos 1 letra mayúscula), al menos 1 número y al menos 1 símbolo",
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
        line_0: 'Al hacer clic en "Crear cuenta" aceptas nuestra',
        line_1: "y también nuestras",
      },
    },
    Login: {
      header_title: "Inicia sesión",
      title: "Hola,\nBienvenido de nuevo",
      login_error:
        "No se pudo iniciar sesión, verifica tus datos o crea una cuenta.",
      email: "Correo electrónico",
      password: "Contraseña",
      forgot_password: "¿Olvidaste tu contraseña?",
      login_button: "Entrar",
      register_button: "¿Eres nuevo por aquí? ¡Crea una cuenta!",
    },
  },
  TabBar: {
    groups: "Grupos",
    friends: "Amigos",
    new_group: "Nuevo grupo",
    settings: "Configuración",
  },
  Home: {
    header_title: "Grupos",
    quick_access: "Acceso rápido",
    empty_list: {
      title: "¿Qué tal si empiezas uniéndote a un grupo?",
      search_text: "Accede a la pestaña",
      line_0: "y busca algo o únete a nuestro",
      official_group: "Grupo Oficial",
    },
    groups_list: {
      title: "Acceder a los grupos",
      subtitle: "Estás en {{count}} grupo",
      subtitle_plural: "Estás en {{count}} grupos",
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
    avatar_select_tip: "Recomendamos una imagen de 600x600 y de máximo 5MB",
    avatar_selected: "🖼 ¡Esta foto está perfecta!",
    limit: {
      title: "¡Has alcanzado el límite de {{count}} grupos!",
      subtitle:
        "Este límite se estipula para que todos puedan crear sus comunidades en Saturn Chat y también para evitar problemas molestos como el spam.",
      premium:
        "También puedes convertirte en una Star y crear hasta {{groups}} grupos con {{participants}} participantes en cada uno",
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
        title: "😥 ¿Seguro que quieres salir?",
        subtitle:
          "Al salir no recibirás notificaciones de nuevos mensajes, invitaciones ni nada relacionado.",
        ok_text: "Salir",
        cancel_text: "Cancelar",
      },
    },
    general: {
      title: "General",
      star: "Sé una Star",
      manage_star: "Gestionar plan Star",
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
    sent: "Comentarios enviados con éxito",
  },
  Search: {
    header_title: "Explorar",
    input_placeholder: "¿Qué buscas hoy?",
    title: "Sin resultados por el momento",
    subtitle:
      "Intenta buscar el nombre de algún grupo, una etiqueta relacionada o un nombre de usuario.",
    loading: {
      title: "Buscando...",
      subtitle: "Esto puede tardar un poco",
    },
    participants: "participante",
    participants_plural: "participantes",
    filters: {
      all: "Todos",
      users: "Usuarios",
      groups: "Grupos",
    },
  },
  InviteManager: {
    header_title: "Invitaciones y solicitudes",
    subtitle:
      "Gestiona tus invitaciones y solicitudes de amistad recibidas.",
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
      updated: "Usuario actualizado",
      update_avatar: "Actualizando avatar...",
      updated_avatar: "Avatar actualizado",
      photo_permission:
        "¡Necesitamos permiso para acceder a tus fotos para cambiar tu avatar!",
    },
    labels: {
      name: {
        label: "Nombre",
        placeholder: "máx. 100 caracteres",
      },
      bio: {
        label: "Estado",
        placeholder: "máx. 100 caracteres",
      },
    },
    done: "Completar",
  },
  SwitchLanguage: {
    header_title: "Idiomas",
    title: "Entiende cómo funcionan los idiomas",
    subtitle:
      "El idioma de la aplicación se define a través del idioma predeterminado del dispositivo.\n\nPara cambiar el idioma, simplemente entra a la configuración del dispositivo y cámbialo, la aplicación cambiará el idioma automáticamente.",
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
        info: "Tu contraseña debe contener: mínimo 8 caracteres (al menos 1 letra mayúscula), al menos 1 número y al menos 1 símbolo",
      },
      confirm_pass: {
        label: "Confirma la nueva contraseña",
        error: "Las contraseñas no coinciden",
      },
    },
    done: "Cambiar contraseña",
  },
  Premium: {
    header_title: "¡Forma parte de la constelación!",
    be_star: "¡Sé una Star!",
    title:
      "¡Obtén ventajas y funciones increíbles de Saturn Chat a un precio accesible!",
    subtitle:
      "¡Aprovecha al máximo todas las funciones disponibles como enviar archivos más grandes, crear más grupos, quitar todos los anuncios molestos y más!",
    free_month: "¡Suscríbete ahora y obtén 1 mes gratis!",
    buy_button: "Obtener desde {{price}}",
    vantages_title: "Ventajas del plan Star:",
    advantages: {
      0: "¡Totalmente libre de anuncios molestos!",
      1: "Aumenta en {{multiple}}x el espacio para enviar archivos, de {{default}}MB a increíbles {{premium}}MB de envío.",
      2: "Aumenta la cantidad de grupos que puedes crear de {{default}} a {{premium}} grupos.",
      3: "Aumenta la cantidad de participantes que puedes tener en tus grupos de {{default}} a {{premium}} participantes.",
      4: "¡Consigue una insignia exclusiva al lado de tu nombre para destacar!",
      5: "¡Aumenta el límite de caracteres de tus mensajes de {{default}} a unos maravillosos {{premium}} caracteres!",
      6: "Apoya el desarrollo de la aplicación y ayuda a traer muchas novedades rápidamente ❤",
      7: "Exporta los mensajes de tus grupos en formato CSV.",
    },
  },
  ManagePremium: {
    header_title: "Gestionar plan Star",
    alerts: {
      cancel_plan: {
        title: "❗ ¿Estás seguro?",
        content:
          "Al cancelar tu suscripción pierdes TODOS los beneficios otorgados por el plan. Además, NO RECIBIRÁS REEMBOLSO DEL MES YA PAGADO (pero podrás disfrutar de los beneficios hasta la fecha de renovación).",
        ok_text: "Mantener plan",
        cancel_text: "Cancelar plan",
      },
    },
    title: "Gestiona tu plan Star",
    subtitle:
      "Aquí verás detalles sobre tu plan como la fecha de renovación y el estado del pago. También puedes cancelar tu suscripción en cualquier momento desde aquí.",
    plan_labels: {
      plan: "Plan de suscripción:",
      status: "Estado de la suscripción",
      start: "Fecha de adquisición",
      expire: "Fecha de renovación",
      resume: "Fecha de reanudación",
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
      "Ahora debes elegir qué plan quieres, pudiendo seleccionar entre planes mensuales, trimestrales o anuales.",
    monthly: "Mensual",
    quarterly: "Trimestral",
    yearly: "Anual",
    button_text: "¡Quiero este!",
  },
  Chat: {
    alerts: {
      file_size: {
        title: "😱 ¡Qué pesado!",
        content:
          "¡No puedo cargar algo tan pesado, intenta algo de hasta {{amount}}MB!",
        extra_button_text: "Obtener plan Star",
      },
      same_file: {
        title: "🤔 Ya he visto esto antes",
        content: "¡Ya has elegido este archivo para ser enviado!",
      },
      mic_perm: {
        title: "🙂 Por favor",
        content:
          "Necesito permiso para usar tu micrófono para poder grabar audios.",
      },
    },
    toasts: {
      sending_voice: "Enviando mensaje de voz...",
    },
    type_message: "Escribe tu mensaje...",
    drop_send: "Suelta para enviar",
    sent: "enviado",
    limit_char: "¡Límite de {{count}} caracteres alcanzado!",
  },
  GroupConfig: {
    header_group_title: "Opciones del grupo",
    header_chat_title: "Opciones del chat",
    alerts: {
      delete_group: {
        title: "⚠ ¡Cuidado, esto es peligroso!",
        content:
          '¡Esta acción es IRREVERSIBLE! Al eliminar el grupo "{{name}}" también eliminarás todos los mensajes, archivos y cualquier otra cosa guardada en este grupo.',
        ok_text: "Eliminar",
        cancel_text: "Cancelar",
      },
      exit_group: {
        title: "😥 ¿Seguro que quieres irte?",
        content:
          "Al salir del grupo, tus mensajes se mantendrán, pero no recibirás notificaciones de nuevos mensajes y tendrás que ser invitado(a) nuevamente para entrar (si es privado).",
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
          "Avisar al propietario del grupo cuando entren nuevos participantes",
        accepting_new_users: "Aceptar entrada de nuevos participantes",
        max_participants:
          "Cantidad máxima de participantes (deja en 0 para cantidad ilimitada)",
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
    header_title: "{{count}} Participante",
    header_title_plural: "{{count}} Participantes",
    title: "Todos los participantes",
    created: "Creado el {{date}}",
    joined: "Unido el {{date}}",
    online: "En línea",
    last_seen: "Visto por última vez el {{date}}",
    owner: "Propietario",
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
    cancel_text: "No, he cambiado de opinión",
    toasts: {
      success: "¡Usuario sancionado con éxito!",
      error: "No se pudo sancionar al usuario. Inténtalo de nuevo.",
    },
  },
  ChangeRole: {
    header_title: "Cambiar rol",
    title: "Roles",
    subtitle:
      "Los miembros con roles especiales pueden controlar diversos recursos del grupo (como la gestión de roles e invitaciones, edición del grupo, etc.). Otorga roles importantes a personas de confianza.",
    roles: {
      participant: {
        name: "Participante",
        desc: "Este rol no otorga poderes especiales al participante.",
      },
      mod: {
        name: "Moderador",
        desc: "Los moderadores son los encargados de cuidar la seguridad del grupo.",
      },
      manager: {
        name: "Gerente",
        desc: "Los gerentes ayudan a administrar el grupo y a traer nuevos usuarios.",
      },
      admin: {
        name: "Administrador",
        desc: "Permite que el participante tenga los mismos poderes que el propietario del grupo.",
      },
    },
    permissions: {
      create_invites: "Crear invitaciones para invitar nuevos usuarios",
      punish_members: "Sancionar a participantes conflictivos",
      manage_roles: "Gestionar roles",
      manage_messages: "Gestionar mensajes (como eliminarlos)",
      edit_group: "Editar información del grupo (nombre, avatar, descripción)",
      delete_group: "Eliminar el grupo",
    },
    toasts: {
      success: "Rol de usuario cambiado con éxito",
      error: "Error al cambiar de rol. Inténtalo de nuevo.",
    },
  },
  FriendsManager: {
    alerts: {
      unfriend: {
        title: "⚠️ ¿Deseas eliminar de tus amigos?",
        content:
          "Si eliminas a este usuario de tu lista de amigos, ya no podrás enviar ni recibir mensajes directos suyos. Todos los mensajes entre ustedes se eliminarán para ambos.",
        ok_text: "Eliminar amistad",
      },
    },
    header_title: "Gestionar amigos",
  },
  InviteUsers: {
    header_title: "Invitar",
    empty_title:
      "No hay amigos a quienes invitar. Intenta compartir una invitación mediante enlaces.",
    title: "Invitación del grupo",
    subtitle:
      "Crea y gestiona todas las invitaciones del grupo a través de nuestro gestor de invitaciones.",
    new_invite_text: "Gestionar invitaciones",
    friends_invite_title: "Invita a tus amigos",
    friends_invite_subtitle:
      "Solo los amigos que no están en el grupo aparecen aquí. Deberán aceptar la invitación para unirse.",
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
    usage: "Usar máximo {{count}} vez",
    usage_plural: "Usar máximo {{count}} veces",
    expire: "Expirar en {{count}} día",
    expire_plural: "Expirar en {{count}} días",
    day: "Día",
    day_plural: "Días",
    active_invites: "Invitaciones activas",
    generate: "Generar",
    expire_in: "Expira en ",
    usage_amount: "Se usó {{count}} vez de ",
    usage_amount_plural: "Se usó {{count}} veces de ",
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
    done: "Completar",
  },
  GroupInfos: {
    join: "Unirse",
    joined: "Participando",
    participants: "Participante",
    participants_plural: "Participantes",
    tags: "Etiquetas del grupo",
    desc: "Descripción",
    accepting_participants_text:
      "Este grupo ha alcanzado el número máximo de participantes",
    toasts: {
      error: "¡No se pudo unirse al grupo!",
    },
  },
  Report: {
    header_title: "Denunciar",
    title: "Haz tu denuncia",
    subtitle:
      "¿Encontraste algo que no parece correcto? Haz tu denuncia para que podamos analizar la situación y tomar las medidas oportunas. No te preocupes, tu denuncia es completamente anónima.",
    types: {
      SPAM: "Spam y/o mensaje no deseado",
      VIOLENCE: "Prácticas violentas, incitación al suicidio o exhibición de armas de fuego",
      SEXUAL: "Contenido sexual, pedofilia o abuso de menores de edad",
      BULLYING: "Bullying o falta de respeto hacia los usuarios",
      RACISM: "Discurso de odio, racismo, xenofobia y similares",
      SCAM: "Estafa, falsos sorteos, extorsión y similares",
      FAKE_ACCOUNT: "Contenido falso o intento de suplantación de identidad",
      DMCA: "Contenido protegido por derechos de autor",
      OTHER: "Otros",
    },
    done: "Denunciar",
    sent: "Denuncia realizada con éxito",
  },
};