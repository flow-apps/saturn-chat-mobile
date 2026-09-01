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
        file_amount_one: "archivo",
        file_amount_other: "archivos",
        replying_text: "Estás respondiendo a:",
        voice_message: "Mensaje de voz",
      },
      FilePreview: {
        alerts: {
          download: {
            title: "❗ Mucho cuidado",
            content:
              "¿Estás seguro de que deseas descargar el archivo? ¡Los archivos maliciosos pueden dañar tu teléfono!\n\n📁 Nombre del archivo: {{name}}",
            ok_text: "Descargar",
            cancel_text: "Cancelar",
          },
        },
      },
      Message: {
        poll: "📊 Encuesta: {{question}}",
        toasts: {
          copied_message: "Mensaje copiado",
        },
        alerts: {
          open_link: {
            title: "⚠ Cuidado, puede ser peligroso",
            content:
              "¿Estás seguro de que deseas acceder a este enlace? No podemos garantizar tu seguridad al visitarlo.\n\n{{url}}",
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
        invalid_invite_title: "🚫 Invitación no válida",
        invalid_invite_subtitle:
          "¡La invitación puede haber expirado, sido eliminada o alcanzado el límite máximo de usos!",
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
      Poll: {
        max_options: "Límite máximo de {{count}} opciones alcanzado.",
        min_options: "La encuesta debe tener al menos {{count}} opciones.",
        type_poll_question: "Escribe la pregunta de la encuesta.",
        create_poll: "Crear encuesta",
        options: "Opciones",
        question_input_placeholder: "Ej: ¿Dónde es el evento?",
        question_option_placeholder: "Opción {{count}}",
        add_option: "Añadir opción",
        multiple: "Permitir opción múltiple",
        question: "Pregunta",
      },
    },
    Modals: {
      EmblemModal: {
        title: "¿Insignia genial, verdad?",
        content:
          "Se otorga a personas muy especiales que apoyan a Saturn Chat con el plan Star.",
        premium_text:
          "¿Quieres una igual? ¡Ven y forma parte de la constelación!",
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
          "Con solo unos clics puedes enviar y recibir mensajes con fotos, videos e incluso notas de voz.",
      },
      2: {
        title: "¡Estás seguro!",
        subtitle:
          "¡Aquí tu privacidad se respeta y tus datos no se venderán a nadie!",
      },
      3: {
        title: "¡Sé una Star!",
        subtitle:
          "Cuando estés listo, ve al menú de ajustes, obtén el plan Star y ¡disfruta de Saturn Chat al máximo!",
      },
    },
  },
  Auth: {
    Home: {
      title: "¿Empezamos?",
      subtitle: "¡Inicia sesión o crea tu cuenta para comenzar a usar la app!",
      login: "Iniciar sesión",
      new_account: "Crear cuenta",
    },
    CreateAccount: {
      header_title: "Crear cuenta",
      avatar_select_label: "Elige una foto de perfil",
      avatar_select_tip:
        "💡 Recordatorio: debes seleccionar una imagen de máximo 5 MB.",
      avatar_selected: "🖼 ¡Esta foto está perfecta!",
      register_error:
        "No se pudo crear la cuenta. Es posible que el correo ya esté en uso; intenta iniciar sesión.",
      internal_error:
        "Ocurrió un erro interno en el servidor. Inténtalo más tarde.",
      nickname_rules:
        "Debe ser un nombre único con solo letras y números. Solo se permiten guiones (-) y guiones bajos (_). Si no proporcionas un nombre de usuario, se generará uno automáticamente.",
      searching: "Buscando...",
      labels: {
        name: "Nombre",
        nickname: "Nombre de usuario",
        email: {
          label: "Correo electrónico",
          error: "Este correo electrónico no es válido",
        },
        password: {
          label: "Escribe una contraseña",
          error: "La contraseña no cumple los requisitos de seguridad",
          info: "Tu contraseña debe tener al menos 8 caracteres (al menos 1 mayúscula), al menos 1 número y 1 símbolo.",
        },
        password_again: {
          label: "Confirma tu contraseña",
          error: "Las contraseñas no coinciden",
        },
      },
      register_button: "Crear cuenta",
      consent: {
        guidelines: "Normas de la Comunidad",
        privacy_policy: "Política de Privacidad",
        line_0: 'Al hacer clic en "Crear cuenta" aceptas nuestra',
        line_1: "y también nuestras",
      },
    },
    Login: {
      header_title: "Inicia sesión",
      title: "Hola,\nBienvenido de nuevo",
      login_error:
        "No se pudo iniciar sesión. Comprueba tus datos o crea una cuenta.",
      email: "Correo electrónico",
      password: "Contraseña",
      forgot_password: "¿Olvidaste tu contraseña?",
      login_button: "Entrar",
      register_button: "¿Eres nuevo por aquí? ¡Crea una cuenta!",
      internal_error:
        "Ocurrió un error interno en el servidor. Inténtalo más tarde.",
    },
    ForgotPassword: {
      alerts: {
        error: "Ocurrió un error",
        warn: "Atención",
        code_error: "Ocurrió un error al solicitar el código.",
        length_code: "Ingresa el código completo de 6 dígitos.",
        invalid_code: "Código no válido o expirado.",
        reset_pass_error: "No se pudo restablecer la contraseña.",
      },
      toasts: {
        switched_password: "¡Contraseña cambiada con éxito!",
      },
      header_title: "Recuperar contraseña",
      title: "¿Perdiste tu contraseña?",
      subtitle:
        "¡No te preocupes! Te ayudaremos a recuperar el acceso a tu cuenta en pocos minutos.",
      email_placeholder: "Correo o Nombre de usuario",
      next_button: "Siguiente",
      verify_code: "Código de verificación",
      verify_subtitle: "Ingresa el código de 6 dígitos enviado a {{masked}}.",
      confirm: "Confirmar",
      new_pass_title: "Crea una nueva contraseña",
      new_pass_subtitle:
        "Tu nueva contraseña debe ser diferente de las contraseñas utilizadas anteriormente.",
      new_pass: "Nueva contraseña",
      pass_rules:
        "Tu contraseña debe tener al menos 8 caracteres (al menos 1 mayúscula), al menos 1 número y 1 símbolo.",
      confirm_pass: "Confirma la nueva contraseña",
      confirm_pass_error: "Las contraseñas no coinciden.",
      switch_pass: "Cambiar contraseña",
    },
  },
  TabBar: {
    groups: "Grupos",
    friends: "Amigos",
    new_group: "Nuevo grupo",
    settings: "Ajustes",
  },
  Home: {
    header_title: "Grupos",
    quick_access: "Acceso rápido",
    empty_list: {
      title: "¿Qué tal si te unes a un grupo para empezar?",
      search_text: "Ve a la pestaña",
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
    empty_list_text: "Aún no tienes amigos. Añade nuevos amigos.",
  },
  NewGroup: {
    header_title: "Nuevo grupo",
    avatar_select_label: "Elige una foto de perfil",
    avatar_select_tip:
      "Recomendamos una imagen de 600x600 píxeles y máximo 5 MB",
    avatar_selected: "🖼 ¡Esta foto está perfecta!",
    limit: {
      title: "¡Has alcanzado el límite de {{count}} grupos!",
      subtitle:
        "Este límite se establece para que todos puedan crear sus comunidades en Saturn Chat y para evitar spam.",
      premium:
        "También puedes convertirte en Star y crear hasta {{groups}} grupos con {{participants}} participantes cada uno.",
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
    header_title: "Ajustes",
    alerts: {
      sign_out: {
        title: "😥 ¿De verdad quieres salir?",
        subtitle:
          "Al salir, no recibirás notificaciones de nuevos mensajes, invitaciones ni nada relacionado.",
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
      guidelines: "Normas de la Comunidad",
      privacy_policy: "Política de Privacidad",
      feedback: "Enviar Comentarios",
    },
    sign_out: "Cerrar sesión",
  },
  SendFeedback: {
    title: "Enviar Comentarios",
    feedback_type: {
      bug: "Errores (Bugs)",
      suggestion: "Sugerencias",
      others: "Otros",
    },
    labels: {
      message: "Mensaje",
    },
    done: "Enviar",
    sent: "¡Comentario enviado con éxito!",
  },
  Search: {
    header_title: "Explorar",
    input_placeholder: "¿Qué buscas hoy?",
    title: "Sin resultados en este momento",
    subtitle:
      "Intenta buscar por el nombre de un grupo, etiqueta relacionada o nombre de usuario.",
    loading: {
      title: "Buscando...",
      subtitle: "Esto puede tardar un momento",
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
    subtitle:
      "Gestiona tus invitaciones a grupos y solicitudes de amistad recibidas.",
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
    searching: "Buscando...",
    errors: {
      "400": "El nombre de usuario no cumple con los estándares esperados",
      "404": "No se proporcionó el nombre de usuario",
      "1000": "No se pudo obtener el nombre de usuario",
      unavailable: "El nombre de usuario no está disponible",
    },
    toasts: {
      updated: "Perfil actualizado",
      update_avatar: "Actualizando avatar...",
      updated_avatar: "Avatar actualizado",
      photo_permission:
        "¡Necesitamos permiso para acceder a tus fotos para cambiar tu avatar!",
    },
    labels: {
      nickname: "Nombre de usuario",
      name: {
        label: "Nombre",
        placeholder: "máx. 100 caracteres",
      },
      bio: {
        label: "Estado/Bio",
        placeholder: "máx. 100 caracteres",
      },
    },
    done: "Listo",
  },
  SwitchLanguage: {
    header_title: "Idiomas",
    title: "Comprende cómo funcionan los idiomas",
    subtitle:
      "El idioma de la aplicación se define según el valor predeterminado de tu dispositivo.\n\nPara cambiarlo, ve a los ajustes de tu teléfono y cámbialo; la aplicación se actualizará automáticamente.",
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
        error: "La contraseña no cumple los requisitos de seguridad",
        info: "Tu contraseña debe tener al menos 8 caracteres (al menos 1 mayúscula), al menos 1 número y 1 símbolo.",
      },
      confirm_pass: {
        label: "Confirma la nueva contraseña",
        error: "Las contraseñas no coinciden",
      },
    },
    done: "Cambiar contraseña",
  },
  Premium: {
    header_title: "¡Sé parte de la constelación!",
    be_star: "¡Sé una Star!",
    title:
      "¡Obtén ventajas y características increíbles en Saturn Chat a un precio accesible!",
    subtitle:
      "¡Aprovecha al máximo todas las funciones disponibles, como envío de archivos más grandes, creación de más grupos, eliminación de anuncios molestos y mucho más!",
    free_month: "¡Suscríbete ahora y obtén 1 mes gratis!",
    buy_button: "Obtener desde {{price}}",
    vantages_title: "Ventajas del plan Star:",
    advantages: {
      0: "¡Totalmente libre de anuncios molestos!",
      1: "Aumenta en {{multiple}}x el espacio para enviar archivos: de {{default}} MB a un increíble {{premium}} MB.",
      2: "Aumenta el límite de grupos que puedes crear: de {{default}} a {{premium}} grupos.",
      3: "Aumenta el número máximo de participantes en tus grupos: de {{default}} a {{premium}} participantes.",
      4: "¡Obtén una insignia exclusiva junto a tu nombre para lucirte!",
      5: "¿Te gusta enviar textos largos? ¡Aumenta el límite de caracteres de tus mensajes de {{default}} a {{premium}} caracteres!",
      6: "Apoya el desarrollo de la aplicación y ayúdanos a traer novedades más rápido ❤",
      7: "Exporta los mensajes de tus grupos en formato CSV.",
    },
  },
  ManagePremium: {
    header_title: "Gestionar plan Star",
    alerts: {
      cancel_plan: {
        title: "❗ ¿Estás seguro de esto?",
        content:
          "Al cancelar tu suscripción, perderás TODOS los beneficios del plan. Además, NO RECIBIRÁS UN REEMBOLSO DEL MES YA PAGADO (pero podrás utilizar los beneficios hasta la fecha de renovación).",
        ok_text: "Mantener plan",
        cancel_text: "Cancelar plan",
      },
    },
    title: "Gestiona tu plan Star",
    subtitle:
      "Aquí verás detalles sobre tu plan, como la fecha de renovación y el estado del pago. También puedes cancelar tu suscripción en cualquier momento desde aquí.",
    plan_labels: {
      plan: "Plan de suscripción:",
      status: "Estado de la suscripción",
      start: "Fecha de compra",
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
      "Ahora debes elegir qué plan prefieres, pudiendo optar entre mensual, trimestral o anual.",
    monthly: "Mensual",
    quarterly: "Trimestral",
    yearly: "Anual",
    button_text: "¡Quiero este!",
    finished: {
      success_title: "¡Suscripción realizada con éxito!",
      error_title: "No se pudo realizar tu suscripción",
      success_subtitle:
        "¡Ahora puedes disfrutar de todos los beneficios del plan Star! Ten en cuenta que puede tardar unos minutos en desbloquearse por completo.",
      error_subtitle:
        "Tu pago pudo haber sido rechazado o la compra cancelada por la tienda de aplicaciones. Comprueba e inténtalo de nuevo más tarde.",
    },
  },
  Call: {
    header_title: "Llamada en grupo",
    participants_count: "{{count}} en la llamada",
    participants_modal: {
      title: "Participantes",
    },
    view_all: "Ver todos",
    floating_button: "Volver a la llamada",
    alert_ok: "Entendido",
    you: "Tú",
    notification: {
      channel_name: "Llamadas en curso",
      title: "Llamada en curso",
      body: "Toca para volver a Saturn Chat",
    },
    events: {
      inactivity_closed: "La llamada se cerró por inactividad.",
      room_closed: "Esta sala de llamada ha sido cerrada.",
    },
    errors: {
      default: {
        title: "No se pudo entrar a la llamada",
        content: "Ocurrió un error al acceder a la llamada.",
      },
      access_blocked: {
        title: "Acceso bloqueado",
        content: "Estás bloqueado en este grupo y no puedes participar en la llamada.",
      },
      group_invalid: {
        title: "Grupo no válido",
        content: "No perteneces a este grupo o la conversación ya no está disponible.",
      },
      direct_limit: {
        title: "Llamada en pareja",
        content: "Esta llamada directa solo puede incluir a los dos participantes de la conversación.",
      },
      participant_limit: {
        title: "Límite de la llamada",
      },
      inactivity_timeout: {
        title: "Llamada finalizada",
        content: "La llamada se cerró por inactividad.",
      },
      call_closed: {
        title: "Llamada finalizada",
        content: "Esta sala de llamada ha sido cerrada.",
      },
      direct_not_part: {
        title: "Participación inválida",
        content: "No eres parte de esta llamada directa.",
      },
    },
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
        content: "¡Ya has seleccionado este archivo para enviarlo!",
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
    sent: "Enviado",
    limit_char: "¡Límite de {{count}} caracteres alcanzado!",
    no_send_message:
      " No puedes enviar mensajes en este grupo, pero puedes verlos y recibir notificaciones.",
  },
  GroupConfig: {
    header_group_title: "Opciones del grupo",
    header_chat_title: "Opciones del chat",
    alerts: {
      delete_group: {
        title: "⚠ Cuidado, esto es peligroso",
        content:
          '¡Esta acción es IRREVERSIBLE! Al eliminar el grupo "{{name}}", también eliminarás todos los mensajes, archivos y cualquier otra cosa guardada en él.',
        ok_text: "Eliminar",
        cancel_text: "Cancelar",
      },
      exit_group: {
        title: "😥 ¿Estás seguro de que quieres irte?",
        content:
          "Al salir del grupo, se mantendrán tus mensajes, pero no recibirás notificaciones y necesitarás una invitación para volver a entrar (si es privado).",
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
          "Notificar al propietario cuando entren nuevos participantes",
        accepting_new_users: "Permitir la entrada de nuevos participantes",
        max_participants:
          "Cantidad máxima de participantes (deja 0 para ilimitado)",
        minimum_role_for_send_message:
          "Rol mínimo para enviar mensajes en el grupo",
        roles: {
          participant: "Participante",
          moderator: "Moderador",
          manager: "Gerente",
          admin: "Administrador",
        },
      },
      participant: {
        send_notifications: "Recibir notificaciones de nuevos mensajes",
        title: "Ajustes del participante",
      },
      danger_zone: {
        title: "Zona de peligro",
        delete_group: "Eliminar grupo",
        exit_group: "Salir del grupo",
      },
    },
    toasts: {
      submit_success: "Ajustes cambiados con éxito",
      submit_error: "No se pudieron guardar los cambios",
    },
  },
  Participants: {
    header_title_one: "{{count}} Participante",
    header_title_other: "{{count}} Participantes",
    title: "Todos los participantes",
    created: "Creado el {{date}}",
    joined: "Se unió el {{date}}",
    online: "En línea",
    last_seen: "Última vez visto el {{date}}",
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
    title: "¿Estás seguro de esto?",
    desc_kick:
      'Estás a punto de expulsar al participante "{{userName}}" del grupo "{{groupName}}". ¿Estás seguro?',
    desc_ban:
      'Estás a punto de banear al participante "{{userName}}" del grupo "{{groupName}}". ¿Estás seguro?',
    notify_text: "Notificar al participante de la sanción",
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
      "Los miembros con roles especiales pueden gestionar varias funciones del grupo. Otorga roles importantes solo a personas de confianza.",
    roles: {
      participant: {
        name: "Participante",
        desc: "Este rol no otorga poderes especiales al participante.",
      },
      mod: {
        name: "Moderador",
        desc: "Los moderadores cuidan la seguridad y el orden del grupo.",
      },
      manager: {
        name: "Gerente",
        desc: "Los gerentes ayudan a organizar el grupo y traer nuevos miembros.",
      },
      admin: {
        name: "Administrador",
        desc: "Permite al participante tener los mismos poderes que el propietario.",
      },
    },
    permissions: {
      create_invites: "Crear invitaciones para añadir nuevos usuarios",
      punish_members: "Sancionar participantes que infrinjan las normas",
      manage_roles: "Gestionar roles",
      manage_messages: "Gestionar mensajes (como eliminarlos)",
      edit_group: "Editar información del grupo (nombre, avatar y descripción)",
      delete_group: "Eliminar el grupo",
    },
    toasts: {
      success: "¡Rol del usuario actualizado con éxito!",
      error: "Error al actualizar el rol. Inténtalo de nuevo.",
    },
  },
  FriendsManager: {
    alerts: {
      unfriend: {
        title: "⚠️ ¿Deseas eliminar la amistad?",
        content:
          "Si eliminas a este usuario de tu lista de amigos, ya no podrás intercambiar mensajes directos. Todos los mensajes entre ustedes se eliminarán para ambos.",
        ok_text: "Eliminar amistad",
      },
    },
    header_title: "Gestionar amigos",
  },
  InviteUsers: {
    header_title: "Invitar",
    empty_title:
      "No hay amigos para invitar. Intenta compartir una invitación mediante enlace.",
    title: "Invitaciones del grupo",
    subtitle:
      "Crea y gestiona todas las invitaciones del grupo a través de nuestro gestor.",
    new_invite_text: "Gestionar invitaciones",
    friends_invite_title: "Invita a tus amigos",
    friends_invite_subtitle:
      "Solo los amigos que no están en el grupo aparecen aquí.",
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
    subtitle: "Puedes generar invitaciones con esta configuración:",
    permanent: "Invitación permanente",
    usage_unlimited: "Usos ilimitados",
    usage_one: "Usar máximo {{count}} vez",
    usage_other: "Usar máximo {{count}} veces",
    expire_one: "Expirar en {{count}} día",
    expire_other: "Expirar en {{count}} días",
    day_one: "Día",
    day_other: "Días",
    active_invites: "Invitaciones activas",
    generate: "Generar",
    expire_in: "Expira en ",
    usage_amount_one: "Usado {{count}} vez de ",
    usage_amount_other: "Usado {{count}} veces de ",
    toasts: {
      error_create: "No se pudo crear la invitación.",
      success_create: "¡Invitación creada con éxito!",
      error_remove: "No se pudo eliminar la invitación.",
      success_remove: "¡Invitación eliminada con éxito!",
      copy_invite: "¡Invitación copiada!",
    },
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
    joined: "Unido",
    participants_one: "Participante",
    participants_other: "Participantes",
    tags: "Etiquetas del grupo",
    desc: "Descripción",
    no_desc: "Este grupo no tiene una descripción.",
    no_tags: "Sin etiquetas definidas",
    accepting_participants_text:
      "Este grupo ha alcanzado la capacidad máxima de participantes.",
    toasts: {
      error: "¡No se pudo unirse al grupo!",
    },
  },
  Report: {
    header_title: "Denunciar",
    title: "Realiza tu denuncia",
    subtitle:
      "¿Encontraste algo inapropiado? Haz tu denuncia para que podamos revisarla de forma anónima.",
    types: {
      SPAM: "Spam y/o mensajes no deseados",
      VIOLENCE: "Prácticas violentas, incitación al suicidio o armas de fuego",
      SEXUAL: "Contenido sexual, pedofilia o abuso de menores",
      BULLYING: "Bullying o acoso a otros usuarios",
      RACISM: "Discurso de odio, racismo, xenofobia, etc.",
      SCAM: "Estafas, sorteos falsos, extorsión, etc.",
      FAKE_ACCOUNT: "Contenido falso o suplantación de identidad",
      DMCA: "Contenido protegido por derechos de autor",
      OTHER: "Otros",
    },
    done: "Denunciar",
    sent: "¡Denuncia realizada con éxito!",
  },
};
