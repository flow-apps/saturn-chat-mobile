export const pt = {
  Components: {
    Ads: {
      remove_ad: "Remover anúncio",
    },
    GroupInvite: {
      participants: "participantes",
      join: "Entrar",
    },
    FriendActionButtons: {
      title: "está querendo ser seu amigo",
      accept: "Aceitar",
      reject: "Recusar",
    },
    AddFriendButton: {
      friends: "Amigos",
      requested: "Solicitação enviada",
      request: "Adicionar aos amigos",
    },
    Chat: {
      AudioPlayer: {},
      CurrentReplyingMessage: {
        file_amount_one: "arquivo",
        file_amount_other: "arquivos",
        replying_text: "Você está respondendo:",
        voice_message: "Mensagem de voz",
      },
      FilePreview: {
        alerts: {
          download: {
            title: "❗ Muito cuidado",
            content:
              "Tem certeza que quer baixar o arquivo? Arquivos maliciosos podem danificar seu telefone!\n\n📁 Nome do arquivo: {{name}}",
            ok_text: "Baixar",
            cancel_text: "Cancelar",
          },
        },
      },
      Message: {
        poll: "📊 Enquete: {{question}}",
        toasts: {
          copied_message: "Mensagem copiada",
        },
        alerts: {
          open_link: {
            title: "⚠ Cuidado, pode ser perigoso",
            content:
              "Tem certeza que quer acessar este link? Não podemos garantir sua segurança ao acessá-lo.\n\n{{url}}",
            ok_text: "Acessar",
            cancel_text: "Não",
          },
        },
        options: {
          reply: "Responder",
          copy: "Copiar",
          show_original_message: "Mostrar mensagem original",
          translate_message: "Traduzir mensagem",
          original_restored: "Mensagem original restaurada.",
          already_in_lang: "A mensagem já está no seu idioma.",
          translated_success: "Mensagem traduzida!",
          not_identified_lang: "Não foi possível identificar o idioma.",
          part_opt: "Opções do participante",
          delete: "Excluir",
          report: "Denunciar mensagem",
        },
      },
      RecordingAudio: {
        recording: "Gravando",
      },
      ReplyingMessage: {
        read_more: "Ler mais",
        read_less: "Ler menos",
        replying: "Respondendo:",
        voice_message: "🎤 Mensagem de voz",
        files_one: "arquivo",
        files_other: "arquivos",
      },
      InviteInMessage: {
        invalid_invite_title: "🚫 Convite inválido",
        invalid_invite_subtitle:
          "O convite pode ter expirado, ter sido apagado ou atingido o limite máximo de usos!",
        invite_title: "Convite para:",
        invite_screen_title: "Você foi convidado(a) para o grupo:",
        no_desc: "Sem descrição",
        joined_text: "Você já entrou!",
        join_text: "Entrar no grupo",
        toasts: {
          joined: "Você entrou no grupo '{{name}}'!",
          error: "Não foi possível usar o convite",
        },
      },
      LinkPreview: {
        watch_text: "Toque aqui para assistir",
        link_copied: "Link copiado",
      },
      Typing: {
        typing_user_one: "está ",
        typing_user_other: "estão ",
        typing: "digitando",
        many: "Vários usuários",
      },
      Poll: {
        max_options: "Máximo de {{count}} opções atingido.",
        min_options: "A enquete deve ter pelo menos {{count}} opções.",
        type_poll_question: "Digite a pergunta da enquete.",
        create_poll: "Criar Enquete",
        options: "Opções",
        question_input_placeholder: "Ex: Qual o local do evento?",
        question_option_placeholder: "Opção {{count}}",
        add_option: "Adicionar opção",
        multiple: "Permitir múltipla escolha",
        question: "Pergunta",
      },
    },
    Modals: {
      EmblemModal: {
        title: "Emblema legal, né?",
        content:
          "Ele é dado a pessoas muito especiais que apoiam o Saturn Chat com o plano Star.",
        premium_text:
          "Quer ter um igual? Então venha fazer parte da constelação!",
        be_star: "Obter Star",
      },
    },
    Alert: {
      cancel: "Cancelar",
    },
  },
  OnBoarding: {
    done: "Começar",
    skip: "Pular",
    pages: {
      0: {
        title: "Bem-vindo ao Saturn Chat!",
        subtitle:
          "Aqui você encontrará uma enorme variedade de grupos (ou poderá criar um do jeito que quiser).",
      },
      1: {
        title: "Envie mensagens com facilidade!",
        subtitle:
          "Com poucos cliques você já consegue enviar e receber mensagens com fotos, vídeos e até mensagens de voz.",
      },
      2: {
        title: "Você está seguro!",
        subtitle:
          "Aqui sua privacidade é preservada e seus dados não serão vendidos a ninguém!",
      },
      3: {
        title: "Seja uma Star!",
        subtitle:
          "Quando estiver pronto, vá ao menu de configurações, obtenha o plano Star e aproveite o Saturn Chat ao máximo!",
      },
    },
  },
  Auth: {
    Home: {
      title: "Vamos começar?",
      subtitle: "Acesse ou crie sua conta para começar a usar o app!",
      login: "Fazer login",
      new_account: "Criar conta",
    },
    CreateAccount: {
      header_title: "Criar conta",
      avatar_select_label: "Escolha uma foto de perfil",
      avatar_select_tip:
        "💡 Lembrete: você deve selecionar uma imagem de no máximo 5 MB.",
      avatar_selected: "🖼 Esta foto está perfeita!",
      register_error:
        "Não foi possível criar a conta. Possivelmente o e-mail já está em uso; tente fazer login.",
      internal_error: "Ocorreu um erro interno no servidor. Tente mais tarde.",
      nickname_rules:
        "Deve ser um nome único, contendo apenas números e letras. Apenas os símbolos de hífen (-) e underline (_) estão disponíveis. Se nenhum nome de usuário for fornecido será gerado um automaticamente para você.",
      searching: "Buscando...",
      labels: {
        name: "Nome",
        nickname: "Nome de usuário",
        email: {
          label: "E-mail",
          error: "Esse e-mail não é válido",
        },
        password: {
          label: "Digite uma senha",
          error: "A senha não segue os padrões de segurança",
          info: "Sua senha deve conter no mínimo 8 caracteres (sendo ao menos 1 letra maiúscula), pelo menos 1 número e 1 símbolo.",
        },
        password_again: {
          label: "Confirme sua senha",
          error: "As senhas não combinam",
        },
      },
      register_button: "Criar conta",
      consent: {
        guidelines: "Diretrizes da Comunidade",
        privacy_policy: "Política de Privacidade",
        line_0: 'Ao clicar em "Criar conta" você aceita a nossa',
        line_1: "e também as nossas",
      },
    },
    Login: {
      header_title: "Faça o login",
      title: "Olá,\nBem-vindo de volta",
      login_error:
        "Não foi possível fazer login. Verifique seus dados ou crie uma conta.",
      email: "E-mail",
      password: "Senha",
      forgot_password: "Esqueceu sua senha?",
      login_button: "Entrar",
      register_button: "É novo por aqui? Crie uma conta!",
      internal_error: "Ocorreu um erro interno no servidor. Tente mais tarde.",
    },
    ForgotPassword: {
      alerts: {
        error: "Ocorreu um erro",
        warn: "Atenção",
        code_error: "Ocorreu um erro ao solicitar o código.",
        length_code: "Informe o código de 6 dígitos completo.",
        invalid_code: "Código inválido ou expirado.",
        reset_pass_error: "Não foi possível redefinir a senha.",
      },
      toasts: {
        switched_password: "Senha alterada com sucesso!",
      },
      header_title: "Recuperar senha",
      title: "Perdeu sua senha?",
      subtitle:
        "Não se preocupe! Ajudaremos você a retomar o acesso à sua conta em poucos minutos.",
      email_placeholder: "E-mail ou Nome de usuário",
      next_button: "Próximo",
      verify_code: "Código de verificação",
      verify_subtitle: "Insira o código de 6 dígitos enviado para {{masked}}.",
      confirm: "Confirmar",
      new_pass_title: "Crie uma nova senha",
      new_pass_subtitle:
        "Sua nova senha deve ser diferente das senhas utilizadas anteriormente.",
      new_pass: "Nova senha",
      pass_rules: "Sua senha deve conter no mínimo 8 caracteres (sendo ao menos 1 letra maiúscula), pelo menos 1 número e 1 símbolo.",
      confirm_pass: "Confirme a nova senha",
      confirm_pass_error: "As senhas não coincidem.",
      switch_pass: "Alterar Senha"
    },
  },
  TabBar: {
    groups: "Grupos",
    friends: "Amigos",
    new_group: "Novo grupo",
    settings: "Opções",
  },
  Home: {
    header_title: "Grupos",
    quick_access: "Acesso rápido",
    empty_list: {
      title: "Que tal começar entrando num grupo?",
      search_text: "Acesse a aba",
      line_0: "e pesquise algo ou entre no nosso",
      official_group: "Grupo Oficial",
    },
    groups_list: {
      title: "Acessar os grupos",
      subtitle_one: "Você está em {{count}} grupo",
      subtitle_other: "Você está em {{count}} grupos",
    },
  },
  Friends: {
    header_title: "Amigos",
    title: "Mensagens diretas",
    subtitle:
      "Envie mensagens privadas aos seus amigos. Você só pode falar com pessoas da sua lista de amigos.",
    empty_list_text: "Você não possui nenhum amigo. Adicione novos amigos.",
  },
  NewGroup: {
    header_title: "Novo grupo",
    avatar_select_label: "Escolha uma foto de perfil",
    avatar_select_tip:
      "Recomendamos uma imagem de 600x600 pixels e no máximo 5 MB",
    avatar_selected: "🖼 Esta foto está perfeita!",
    limit: {
      title: "Você atingiu o limite de {{count}} grupos!",
      subtitle:
        "Esse limite é estipulado para que todos possam criar suas comunidades no Saturn Chat e também para evitar problemas como spam.",
      premium:
        "Você também pode se tornar uma Star e criar até {{groups}} grupos com {{participants}} participantes em cada.",
    },
    form: {
      labels: {
        name: {
          label: "Nome do grupo",
          placeholder: "máx. 100 caracteres",
        },
        desc: {
          label: "Descreva seu grupo",
          placeholder: "máx. 500 caracteres",
        },
        tags: {
          label: "Tags do grupo",
          placeholder: "separar por vírgula",
        },
        public: "Público",
        private: "Privado",
      },
      create_group: "Criar grupo",
    },
    star: "Tornar-se Star",
  },
  Settings: {
    header_title: "Configurações",
    alerts: {
      sign_out: {
        title: "😥 Quer mesmo sair?",
        subtitle:
          "Ao sair, você não receberá notificações de novas mensagens, convites ou nada relacionado.",
        ok_text: "Sair",
        cancel_text: "Cancelar",
      },
    },
    general: {
      title: "Geral",
      star: "Seja uma Star",
      manage_star: "Gerenciar plano Star",
      edit_profile: "Editar perfil",
      languages: "Idiomas",
      dark_theme: "Modo Escuro",
      notifications: "Notificações",
    },
    account: {
      title: "Conta e privacidade",
      edit_password: "Alterar senha",
    },
    about: {
      developer_options: "Opções de Desenvolvedor",
      use_dev_api: "Usar API de Desenvolvimento",
      title: "Sobre",
      guidelines: "Diretrizes da Comunidade",
      privacy_policy: "Política de Privacidade",
      feedback: "Enviar Feedback",
    },
    sign_out: "Sair da conta",
  },
  SendFeedback: {
    title: "Enviar Feedback",
    feedback_type: {
      bug: "Bugs",
      suggestion: "Sugestões",
      others: "Outros",
    },
    labels: {
      message: "Mensagem",
    },
    done: "Enviar",
    sent: "Feedback enviado com sucesso!",
  },
  Search: {
    header_title: "Explorar",
    input_placeholder: "O que procura hoje?",
    title: "Sem resultados no momento",
    subtitle:
      "Tente buscar pelo nome de algum grupo, tag relacionada a ele ou nome de usuário.",
    loading: {
      title: "Buscando...",
      subtitle: "Isso pode demorar um pouco",
    },
    participants_one: "participante",
    participants_other: "participantes",
    filters: {
      all: "Todos",
      users: "Usuários",
      groups: "Grupos",
    },
  },
  InviteManager: {
    header_title: "Convites e solicitações",
    subtitle: "Gerencie seus convites e solicitações de amizade recebidas.",
    empty_text:
      "Não há convites para grupos nem solicitações de amizade. Volte mais tarde.",
    toasts: {
      invite_accept: "Convite aceito!",
      invite_reject: "Convite recusado :(",
      request_accept: "Solicitação aceita com sucesso!",
      request_reject: "Solicitação rejeitada com sucesso",
    },
  },
  Profile: {
    friends: "Amigos",
    participating: "Participando",
  },
  EditProfile: {
    header_title: "Editar perfil",
    switch_avatar: "Trocar avatar",
    searching: "Buscando...",
    errors: {
      "400": "O nome de usuário não está conforme os padrões esperados",
      "404": "O nome de usuário não foi fornecido",
      "1000": "Não foi possível buscar o nome de usuário",
      unavailable: "O nome de usuário não está disponível",
    },
    toasts: {
      updated: "Perfil atualizado",
      update_avatar: "Atualizando avatar...",
      updated_avatar: "Avatar atualizado",
      photo_permission:
        "Precisamos de permissão para acessar suas fotos para alterar seu avatar!",
    },
    labels: {
      nickname: "Nome de usuário",
      name: {
        label: "Nome",
        placeholder: "máx. 100 caracteres",
      },
      bio: {
        label: "Recado",
        placeholder: "máx. 100 caracteres",
      },
    },
    done: "Concluir",
  },
  SwitchLanguage: {
    header_title: "Idiomas",
    title: "Entenda como funcionam os idiomas",
    subtitle:
      "O idioma do aplicativo é definido pelo padrão do seu dispositivo.\n\nPara alterá-lo, basta acessar as configurações do seu aparelho e realizar a troca; o aplicativo será atualizado automaticamente.",
  },
  SwitchPassword: {
    header_title: "Altere sua senha",
    toasts: {
      updated_pass: "Senha alterada com sucesso!",
      incorrect_pass: "Senha atual incorreta!",
      error_pass: "Erro ao alterar senha!",
    },
    labels: {
      current_password: "Senha atual",
      new_password: {
        label: "Nova senha",
        error: "A senha não segue os padrões de segurança",
        info: "Sua senha deve conter no mínimo 8 caracteres (sendo ao menos 1 letra maiúscula), pelo menos 1 número e 1 símbolo.",
      },
      confirm_pass: {
        label: "Confirme a nova senha",
        error: "As senhas não combinam",
      },
    },
    done: "Alterar senha",
  },
  Premium: {
    header_title: "Faça parte da constelação!",
    be_star: "Seja uma Star!",
    title:
      "Ganhe vantagens e recursos incríveis no Saturn Chat por um custo que cabe no seu bolso!",
    subtitle:
      "Aproveite ao máximo todos os recursos disponíveis, como envio de arquivos maiores, criação de mais grupos, remoção de anúncios chatos e muito mais!",
    free_month: "Assine agora e ganhe 1 mês grátis!",
    buy_button: "Obter a partir de {{price}}",
    vantages_title: "Vantagens do plano Star:",
    advantages: {
      0: "Totalmente livre de anúncios chatos!",
      1: "Aumente em {{multiple}}x o espaço para envio de arquivos: de {{default}} MB para incríveis {{premium}} MB.",
      2: "Aumente a quantidade de grupos que você pode criar: de {{default}} para {{premium}} grupos.",
      3: "Aumente a quantidade de participantes que você pode ter em seus grupos: de {{default}} para {{premium}} participantes.",
      4: "Aumente o limite de pessoas por chamada: de {{default}} para {{premium}} participantes.",
      5: "Ganhe um selo exclusivo ao lado do seu nome para ostentar!",
      6: "Gosta de mandar textões? Aumente o limite das suas mensagens de {{default}} para maravilhosos {{premium}} caracteres!",
      7: "Apoie o desenvolvimento do aplicativo e nos ajude a trazer novidades mais rápido ❤",
      8: "Exporte as mensagens dos seus grupos em formato CSV.",
    },
  },
  ManagePremium: {
    header_title: "Gerenciar plano Star",
    alerts: {
      cancel_plan: {
        title: "❗ Tem certeza disso?",
        content:
          "Ao cancelar sua assinatura, você perde TODOS os benefícios concedidos pelo plano. Além disso, você NÃO RECEBERÁ REEMBOLSO DO MÊS JÁ PAGO (mas poderá utilizar os benefícios até a data de renovação).",
        ok_text: "Manter plano",
        cancel_text: "Cancelar plano",
      },
    },
    title: "Gerencie seu plano Star",
    subtitle:
      "Aqui você vê detalhes sobre o seu plano, como a data de renovação e o status de pagamento. Você também pode cancelar sua assinatura a qualquer momento por aqui.",
    plan_labels: {
      plan: "Plano da assinatura:",
      status: "Status da assinatura",
      start: "Data de aquisição",
      expire: "Data de renovação",
      resume: "Data de retorno",
    },
    payments: {
      0: "Pendente",
      1: "Pago",
      2: "Teste",
      3: "Plano atualizado",
    },
    periods: {
      0: "Mensal",
      1: "Trimestral",
      2: "Anual",
    },
    cancel_text: "Cancelar assinatura",
  },
  ChoosePlan: {
    header_title: "Escolha seu plano",
    title: "Estamos quase lá!",
    subtitle:
      "Agora você deve escolher qual plano você quer, podendo optar entre mensal, trimestral ou anual.",
    monthly: "Mensal",
    quarterly: "Trimestral",
    yearly: "Anual",
    button_text: "Eu quero esse!",
    finished: {
      success_title: "Assinatura realizada com sucesso!",
      error_title: "Não foi possível realizar sua assinatura",
      success_subtitle:
        "Você agora pode usufruir de vários benefícios disponíveis no plano Star! Mas atenção, pode demorar alguns minutos até que todos os benefícios sejam totalmente liberados, então não se preocupe.",
      error_subtitle:
        "Seu pagamento pode ter sido negado ou sua compra cancelada pela loja de aplicativos. Verifique e tente novamente mais tarde",
    },
  },
  Call: {
    header_title: "Chamada em Grupo",
    participants_count: "{{count}} na chamada",
    participants_modal: {
      title: "Participantes",
    },
    view_all: "Ver todos",
    floating_button: "Voltar para chamada",
    alert_ok: "Entendi",
    you: "Você",
    notification: {
      channel_name: "Chamadas em andamento",
      title: "Chamada em andamento",
      body: "Toque para voltar ao Saturn Chat",
    },
    events: {
      inactivity_closed: "A chamada foi encerrada por inatividade.",
      room_closed: "A sala de chamada foi encerrada.",
    },
    errors: {
      default: {
        title: "Não foi possível entrar na chamada",
        content: "Ocorreu um erro ao acessar a chamada.",
      },
      access_blocked: {
        title: "Acesso bloqueado",
        content: "Você está bloqueado neste grupo e não pode participar da chamada.",
      },
      group_invalid: {
        title: "Grupo inválido",
        content: "Você não pertence a este grupo ou a conversa não está mais disponível.",
      },
      direct_limit: {
        title: "Chamada em dupla",
        content: "Esta chamada direta só pode ter os dois participantes da conversa.",
      },
      participant_limit: {
        title: "Limite da chamada",
      },
      inactivity_timeout: {
        title: "Chamada encerrada",
        content: "A chamada foi encerrada por inatividade.",
      },
      call_closed: {
        title: "Chamada encerrada",
        content: "A sala de chamada foi encerrada.",
      },
      direct_not_part: {
        title: "Participação inválida",
        content: "Você não faz parte desta chamada direta.",
      },
    },
  },
  Chat: {
    alerts: {
      file_size: {
        title: "😱 Que arquivo pesado!",
        content:
          "Eu não consigo carregar algo tão grande; tente enviar um arquivo de até {{amount}} MB!",
        extra_button_text: "Obter plano Star",
      },
      same_file: {
        title: "🤔 Já vi isso antes",
        content: "Você já escolheu este arquivo para ser enviado!",
      },
      mic_perm: {
        title: "🙂 Por favor",
        content:
          "Eu preciso de permissão para usar seu microfone, assim poderei gravar áudios.",
      },
    },
    toasts: {
      sending_voice: "Enviando mensagem de voz...",
    },
    type_message: "Digite sua mensagem...",
    drop_send: "Solte para enviar",
    sent: "Enviado",
    limit_char: "Limite de {{count}} caracteres atingido!",
    no_send_message:
      " Você não pode enviar mensagens nesse grupo, mas ainda pode vê-las e receber notificações.",
  },
  GroupConfig: {
    header_group_title: "Opções do grupo",
    header_chat_title: "Opções do chat",
    alerts: {
      delete_group: {
        title: "⚠ Cuidado, isso é perigoso!",
        content:
          'Essa ação é IRREVERSÍVEL! Ao apagar o grupo "{{name}}", você também apagará todas as mensagens, arquivos e qualquer outra coisa que esteja salva nele!',
        ok_text: "Apagar",
        cancel_text: "Cancelar",
      },
      exit_group: {
        title: "😥 Tem certeza de que quer ir embora?",
        content:
          "Ao sair do grupo, suas mensagens serão mantidas, porém você não receberá notificações de novas mensagens e precisará ser convidado(a) novamente para entrar (caso o grupo seja privado).",
        ok_text: "Sair",
      },
    },
    options: {
      general: {
        title: "Gerais",
        participants: "Participantes",
        invite_users: "Convidar usuários",
        edit_group: "Editar grupo",
        details: "Ver detalhes",
        notify_new_participants:
          "Avisar ao dono quando novos participantes entrarem no grupo",
        accepting_new_users: "Aceitar a entrada de novos participantes",
        max_participants:
          "Quantidade máxima de participantes (deixe 0 para ilimitado)",
        minimum_role_for_send_message:
          "Cargo mínimo para enviar mensagens no grupo (cargos inferiores ao selecionado não poderão enviar mensagens)",
        roles: {
          participant: "Participante",
          moderator: "Moderador",
          manager: "Gerente",
          admin: "Administrador",
        },
      },
      participant: {
        send_notifications: "Receber notificações de novas mensagens",
        title: "Configurações do participante",
      },
      danger_zone: {
        title: "Zona de perigo",
        delete_group: "Apagar grupo",
        exit_group: "Sair do grupo",
      },
    },
    toasts: {
      submit_success: "Configurações alteradas com sucesso",
      submit_error: "Não foi possível salvar as alterações",
    },
  },
  Participants: {
    header_title_one: "{{count}} Participante",
    header_title_other: "{{count}} Participantes",
    title: "Todos os participantes",
    created: "Criado em {{date}}",
    joined: "Entrou em {{date}}",
    online: "Online",
    last_seen: "Visto por último em {{date}}",
    owner: "Dono",
  },
  Participant: {
    title: "Opções do participante",
    view_profile: "Ver perfil",
    change_role: "Mudar cargo",
    kick: "Expulsar",
    ban: "Banir participante",
  },
  PunishParticipant: {
    title: "Tem certeza disso?",
    desc_kick:
      'Você está prestes a expulsar o participante "{{userName}}" do grupo "{{groupName}}". Tem certeza da sua escolha?',
    desc_ban:
      'Você está prestes a banir o participante "{{userName}}" do grupo "{{groupName}}". Tem certeza da sua escolha?',
    notify_text: "Notificar participante da punição",
    confirm_text_kick: "Sim, expulsar agora!",
    confirm_text_ban: "Sim, banir agora!",
    cancel_text: "Não, mudei de ideia",
    toasts: {
      success: "Usuário punido com sucesso!",
      error: "Não foi possível punir o usuário. Tente novamente.",
    },
  },
  ChangeRole: {
    header_title: "Alterar cargo",
    title: "Cargos",
    subtitle:
      "Membros com cargos especiais podem ter controle sobre diversos recursos do grupo (como gerenciamento de cargos e convites, edição, etc). Dê cargos importantes apenas para pessoas em que confia.",
    roles: {
      participant: {
        name: "Participante",
        desc: "Este cargo não dá poderes especiais ao participante.",
      },
      mod: {
        name: "Moderador",
        desc: "Os moderadores são os que cuidam da segurança do grupo.",
      },
      manager: {
        name: "Gerente",
        desc: "Os gerentes ajudam a organizar o grupo e a trazer novos usuários.",
      },
      admin: {
        name: "Administrador",
        desc: "Permite que o participante tenha os mesmos poderes do dono do grupo.",
      },
    },
    permissions: {
      create_invites: "Criar convites para chamar novos usuários",
      punish_members: "Punir participantes que infringirem as regras",
      manage_roles: "Gerenciar cargos",
      manage_messages: "Gerenciar mensagens (como apagá-las)",
      edit_group: "Editar informações do grupo (nome, avatar e descrição)",
      delete_group: "Apagar o grupo",
    },
    toasts: {
      success: "Cargo do usuário alterado com sucesso!",
      error: "Erro ao alterar cargo. Tente novamente.",
    },
  },
  FriendsManager: {
    alerts: {
      unfriend: {
        title: "⚠️ Deseja desfazer a amizade?",
        content:
          "Se você remover este usuário da lista de amigos, não poderá mais trocar mensagens diretas com ele. Todas as mensagens entre vocês serão apagadas para ambos.",
        ok_text: "Desfazer amizade",
      },
    },
    header_title: "Gerenciar amigos",
  },
  InviteUsers: {
    header_title: "Convidar",
    empty_title:
      "Não há amigos para convidar. Tente compartilhar um convite através de links.",
    title: "Convites do grupo",
    subtitle:
      "Crie e gerencie todos os convites do grupo através do nosso gerenciador.",
    new_invite_text: "Gerenciar convites",
    friends_invite_title: "Convide seus amigos",
    friends_invite_subtitle:
      "Somente amigos que não estão no grupo aparecem aqui. Eles precisarão aceitar o convite para entrar.",
    invite: "Convidar",
    invited: "Convidado",
    toasts: {
      success: "Convite enviado com sucesso!",
      error: "Não foi possível convidar seu amigo!",
    },
  },
  NewInvites: {
    header_title: "Criar convites",
    title: "Gerar convite",
    subtitle: "Você pode gerar convites com estas configurações:",
    permanent: "Convite permanente",
    usage_unlimited: "Usos ilimitados",
    usage_one: "Usar no máximo {{count}} vez",
    usage_other: "Usar no máximo {{count}} vezes",
    expire_one: "Expirar em {{count}} dia",
    expire_other: "Expirar em {{count}} dias",
    day_one: "Dia",
    day_other: "Dias",
    active_invites: "Convites ativos",
    generate: "Gerar",
    expire_in: "Expira em ",
    usage_amount_one: "Foi usado {{count}} vez de ",
    usage_amount_other: "Foi usado {{count}} vezes de ",
    toasts: {
      error_create: "Não foi possível criar o convite.",
      success_create: "Convite criado com sucesso!",
      error_remove: "Não foi possível remover o convite.",
      success_remove: "Convite removido com sucesso!",
      copy_invite: "Convite copiado!",
    },
  },
  EditGroup: {
    toasts: {
      success: "Grupo editado com sucesso!",
      avatar_permission: "Precisamos de permissão para acessar suas fotos!",
      updating: "Atualizando avatar...",
      updated: "Avatar atualizado",
    },
    header_title: "Editar grupo",
    switch_avatar: "Trocar avatar",
    inputs: {
      name: "Nome",
      desc: "Descrição",
      public: "Tornar público",
    },
    done: "Concluir",
  },
  GroupInfos: {
    join: "Participar",
    joined: "Participando",
    participants_one: "Participante",
    participants_other: "Participantes",
    tags: "Tags do grupo",
    desc: "Descrição",
    no_desc: "Este grupo não possui uma descrição.",
    no_tags: "Nenhuma tag definida",
    accepting_participants_text:
      "Este grupo atingiu o número máximo de participantes.",
    toasts: {
      error: "Não foi possível entrar no grupo!",
    },
  },
  Report: {
    header_title: "Denunciar",
    title: "Faça sua denúncia",
    subtitle:
      "Encontrou algo que não parece certo? Realize sua denúncia para que possamos analisar a situação e tomar as medidas cabíveis. Não se preocupe, sua denúncia é totalmente anônima.",
    types: {
      SPAM: "Spam e/ou mensagens indesejadas",
      VIOLENCE:
        "Práticas violentas, incentivo ao suicídio ou exibição de armas de fogo",
      SEXUAL: "Conteúdo sexual, pedofilia ou abuso de menores",
      BULLYING: "Bullying ou desrespeito a outros usuários",
      RACISM: "Discurso de ódio, racismo, xenofobia e semelhantes",
      SCAM: "Golpes, falsos sorteios, extorsão e semelhantes",
      FAKE_ACCOUNT: "Conteúdo falso ou tentando se passar por outra pessoa",
      DMCA: "Conteúdo protegido por direitos autorais",
      OTHER: "Outros",
    },
    done: "Denunciar",
    sent: "Denúncia realizada com sucesso!",
  },
};
