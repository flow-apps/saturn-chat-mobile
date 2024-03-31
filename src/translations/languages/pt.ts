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
        file_amount: "arquivo",
        file_amount_plural: "arquivos",
        replying_text: "Você está respondendo:",
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
          part_opt: "Opções do participante",
          delete: "Excluir",
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
        files: "arquivo",
        files_plural: "arquivos",
      },
      InviteInMessage: {
        invalid_invite_title: "🚫 Convite inválido",
        invalid_invite_subtitle:
          " O convite pode ter expirado, ter sido apagado ou ter atingido o número máximo de usos!",
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
        typing_user: "está ",
        typing_user_plural: "estão ",
        typing: "digitando",
        many: "Vários usuários",
      },
    },
    Modals: {
      EmblemModal: {
        title: "Emblema legal né?",
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
          "Aqui você encontrará uma enorme variedade de grupos (ou criar um do seu próprio jeito).",
      },
      1: {
        title: "Envie mensagens com facilidade!",
        subtitle:
          "Com poucos cliques você já consegue enviar e receber mensagens com fotos, vídeos e até mensagens de voz.",
      },
      2: {
        title: "Você está seguro!",
        subtitle:
          "Aqui sua privacidade está preservada, seus dados não serão vendidos a ninguém!",
      },
      3: {
        title: "Seja uma Star!",
        subtitle:
          "Quando estiver pronto, vá ao menu de configurações e obtenha o plano Star e aproveite ao máximo o Saturn Chat!",
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
        "💡 Lembrando: Você deve selecionar uma imagem com no máximo 5MB.",
      avatar_selected: "🖼 Esta foto está perfeita!",
      register_error:
        "Não foi possível criar a conta, possivelmente o email já está em uso, tente fazer login",
      labels: {
        name: "Nome",
        email: {
          label: "E-mail",
          error: "Esse email não é válido",
        },
        password: {
          label: "Digite uma senha",
          error: "A senha não segue os padrões segurança",
          infos:
            "Sua senha deve conter: no mínimo 8 caracteres (sendo ao menos 1 letra maiúsculo), pelo menos 1 número e pelo menos 1 símbolo",
        },
        password_again: {
          label: "Confirme sua senha",
          error: "As senhas não combinam",
        },
      },
      register_button: "Criar conta",
      consent: {
        guidelines: "Diretrizes da Comunidade",
        privacy_policy: "Politica de Privacidade",
        line_0: 'Ao clicar em "Criar conta" você aceita a nossa',
        line_1: "e também nossas",
      },
    },
    Login: {
      header_title: "Faça o login",
      title: "Olá,\nBem-vindo de volta",
      login_error:
        "Não foi possível fazer login, verifique seus dados ou crie uma conta",
      email: "E-mail",
      password: "Senha",
      forgot_password: "Esqueceu sua senha?",
      login_button: "Entrar",
      register_button: "É novo por aqui? Crie uma conta!",
    },
  },
  TabBar: {
    groups: "Grupos",
    friends: "Amigos",
    new_group: "Novo grupo",
    settings: "Configurações",
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
      subtitle: "Você está em {{count}} grupo",
      subtitle_plural: "Você está em {{count}} grupos",
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
    avatar_select_tip: "Recomendamos uma imagem de 600x600 e de no máximo 5MB",
    avatar_selected: "🖼 Esta foto está perfeita!",
    limit: {
      title: "Você atingiu o limite de {{count}} grupos!",
      subtitle:
        "Esse limite é estipulado para que todos possam criar suas comunidades no Saturn Chat e também para evitar problemas chatos como spam.",
      premium:
        "Você também pode se tornar uma Star e criar até {{groups}} grupos com {{participants}} participantes em cada",
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
          "Ao sair você não receberá notificações de novas mensagens, convites e nada relacionado.",
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
      title: "Sobre",
      guidelines: "Diretrizes da Comunidade",
      privacy_policy: "Politica de Privacidade",
    },
    sign_out: "Sair da conta",
  },
  Search: {
    header_title: "Explorar",
    input_placeholder: "O que procura hoje?",
    title: "Sem resultados no momento",
    subtitle: "Tente buscar o nome de algum grupo ou tag relacionado a ele",
    loading: {
      title: "Buscando grupos...",
      subtitle: "Isso pode demorar um pouco",
    },
    participants: "participante",
    participants_plural: "participantes",
  },
  InviteManager: {
    header_title: "Convites e soliticitações",
    subtitle:
      "Gerencie seus convites e solicitações de amizade que você recebeu.",
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
    toasts: {
      updated: "Usuário atualizado",
      update_avatar: "Atualizando avatar...",
      updated_avatar: "Avatar atualizado",
      photo_permission:
        "Precisamos da permissão para acessar suas fotos para alterar seu avatar!",
    },
    labels: {
      name: {
        label: "Nome",
        placeholder: "máx. 100 caractéres",
      },
      bio: {
        label: "Recado",
        placeholder: "máx. 100 caractéres",
      },
    },
    done: "Concluir",
  },
  SwitchLanguage: {
    header_title: "Idiomas",
    title: "Entenda como funciona os idiomas",
    subtitle:
      "O idioma do aplicativo é definido através do idioma padrão do dispositivo.\n\nPara trocar o idioma, basta entrar nas configurações do dispositivo e alterar o idioma, que o aplicativo trocará o idioma automaticamente.",
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
        error: "A senha não segue os padrões segurança",
        info: "Sua senha deve conter: no mínimo 8 caracteres (sendo ao menos 1 letra maiúsculo), pelo menos 1 número e pelo menos 1 símbolo",
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
      "Ganhe vantagens e recursos incríveis do Saturn Chat por um custo que cabe no seu bolso!",
    subtitle:
      "Aproveite ao máximo todos os recursos disponíveis como envio de arquivos maiores, criar mais grupos, remover todos os anúncios chatos, e mais!",
    free_month: "Assine agora e ganhe 1 mês grátis!",
    buy_button: "Obter a partir de {{price}}",
    vantages_title: "Vantagens do plano Star:",
    advantages: {
      0: "Totalmente livre de anúncios chatos!",
      1: "Aumente em {{multiple}}x o espaço para envio de arquivos, de {{default}}MB para incríveis {{premium}}MB de envio.",
      2: "Aumente a quantidade de grupos que você pode criar de {{default}} para {{premium}} grupos.",
      3: "Aumente a quantidade de participantes que você pode ter em seus grupos de {{default}} para {{premium}} participantes.",
      4: "Ganhe um selo exclusivo ao lado do seu nome para sair ostentando!",
      5: "Gosta de mandar textões? Então aumente suas mensagens de {{default}} caracteres para maravilhosos {{premium}} caracteres!",
      6: "Apoia o desenvolvimento do aplicativo e a trazer muitas novidades de maneira rápida ❤",
      7: "Exporte as mensagens de seus grupos em formato CSV.",
    },
  },
  ManagePremium: {
    header_title: "Gerenciar plano Star",
    alerts: {
      cancel_plan: {
        title: "❗ Tem certeza disso?",
        content: "Ao cancelar sua assinatura você perde TODOS os beneficios concedidos pelo plano. Além disso, você NÃO RECEBERÁ O REEMBOLSO DO MÊS JÁ PAGO (mas poderá utilizar os benefícios até a data de renovação).",
        ok_text: "Manter plano",
        cancel_text: "Cancelar plano"
      }
    },
    title: "Gerencie seu plano Star",
    subtitle: "Aqui você vê detalhes sobre seu plano como a data de renovação do plano, o status de pagamento. Você também pode cancelar sua assinatura a qualquer momento por aqui.",
    plan_labels: {
      plan: "Plano da assinatura:",
      status: "Status da assinatura",
      start: "Data da aquisição",
      expire: "Data de renovação",
    },
    payments: {
      0: "Pendente",
      1: "Pago",
      2: "Teste",
      3: "Plano atualizado"
    },
    periods: {
      0: "Mensal",
      1: "Trimestral",
      2: "Anual"
    },
    cancel_text: "Cancelar assinatura" 
  },
  ChoosePlan: {
    header_title: "Escolha seu plano",
    title: "Estamos quase lá!",
    subtitle:
      "Agora você deve escolher qual plano você quer, podendo escolher entre os planos mensais, trimestrais ou anuais.",
    monthly: "Mensal",
    quarterly: "Trimestral",
    yearly: "Anual",
    button_text: "Eu quero esse!",
  },
  Chat: {
    alerts: {
      file_size: {
        title: "😱 Que coisa pesada!",
        content:
          "Eu não consigo carregar algo tão pesado, tente algo de até {{amount}}MB!",
        extra_button_text: "Obter plano Star",
      },
      same_file: {
        title: "🤔 Já vi isso antes",
        content: "Você já escolheu este arquivo para ser enviado!",
      },
      mic_perm: {
        title: "🙂 Por favor",
        content:
          "Eu preciso de permissão para usar seu microfone, assim eu poderei gravar áudios",
      },
    },
    toasts: {
      sending_voice: "Enviando mensagem de voz...",
    },
    type_message: "Digite sua mensagem...",
    drop_send: "Solte para enviar",
    sent: "enviado",
    limit_char: "Limite de {{count}} caracteres atingido!",
  },
  GroupConfig: {
    header_group_title: "Opções do grupo",
    header_chat_title: "Opções do chat",
    alerts: {
      delete_group: {
        title: "⚠ Cuidado, isso é perigoso!",
        content:
          'Essa ação é IRREVERSÍVEL! Ao apagar o grupo "{{name}}" você também estará apagando todas as mensagens, arquivos e qualquer outra coisa que esteja mantendo nesse grupo!',
        ok_text: "Apagar",
        cancel_text: "Cancelar",
      },
      exit_group: {
        title: "😥 Tem certeza que quer ir embora?",
        content:
          "Ao sair do grupo, suas mensagens serão mantidas, porém, você não receberá notificações de novas mensagens e precisará ser convidado(a) para entrar novamente ao grupo (caso seja privado)!",
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
      },
      danger_zone: {
        title: "Zona de perigo",
        delete_group: "Apagar grupo",
        exit_group: "Sair do grupo",
      },
    },
  },
  Participants: {
    header_title: "{{count}} Participante",
    header_title_plural: "{{count}} Participantes",
    title: "Todos os participantes",
    created: "Criou em {{date}}",
    joined: "Entrou em {{date}}",
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
      'Você está prestes a expulsar o participante "{{userName}}" do grupo "{{groupName}}". Você tem certeza da sua escolha?',
    desc_ban:
      'Você está prestes a banir o participante "{{userName}}" do grupo "{{groupName}}". Você tem certeza da sua escolha?',
    notify_text: "Notificar participante da punição",
    confirm_text_kick: "Sim, expulsar agora!",
    confirm_text_ban: "Sim, banir agora!",
    cancel_text: "Não, mudei de ideia",
    toasts: {
      success: "Usuário punido com sucesso!",
      error: "Não foi possível punir o usuário. Tente novamente."
    }
  },
  ChangeRole: {
    header_title: "Alterar cargo",
    title: "Cargos",
    subtitle:
      "Membros com cargos especiais podem ter controle em diversos recursos (como de gerenciamento de cargos e convites, edição do grupo, etc) do grupo. Dê cargos importantes para pessoas em que confia.",
    roles: {
      participant: {
        name: "Participante",
        desc: "Este cargo não dá poderes especiais ao participante."
      },
      mod: {
        name: "Moderador",
        desc: "Os moderadores são os que cuidam da segurança do grupo."
      },
      manager: {
        name: "Gerente",
        desc: "Os gerentes ajudam a gerenciar o grupo e a trazer novos usuários."
      },
      admin: {
        name: "Administrador",
        desc: "Permite que o participante tenha os mesmos poderes do dono do grupo."
      }
    },
    permissions: {
      create_invites: "Criar convites para convidar novos usuários",
      punish_members: "Punir participantes bagunceiros",
      manage_roles: "Gerenciar cargos",
      manage_messages: "Gerenciar mensagens (como apagar elas)",
      edit_group: "Editar informações do grupo (nome, avatar, descrição)",
      delete_group: "Apagar o grupo",
    },
    toasts: {
      success: "Cargo do usuário alterado com sucesso",
      error: "Erro ao alterar cargo. Tente novamente."
    }
  },
  FriendsManager: {
    alerts: {
      unfriend: {
        title: "⚠️ Deseja desfazer a amizade?",
        content: "Se você remover este usuário da lista de amigos, você não poderá mais enviar e receber mensagens diretas desse usuário. Todas as mensagens entre vocês serão apagadas para ambos.",
        ok_text: "Desfazer amizade"
      }
    },
    header_title: "Gerenciar amigos"
  },
  InviteUsers: {
    header_title: "Convidar",
    empty_title: "Não há amigos para convidar. Tente compartilhar um convite através de links.",
    title: "Convite do grupo",
    subtitle: "Crie e gerencie todos os convites do grupo através do nosso gerenciador de convites",
    new_invite_text: "Gerenciar convites",
    friends_invite_title: "Convide seus amigos",
    friends_invite_subtitle: "Somente amigos que não estão no grupo aparecem aqui. Eles precisarão aceitar o convite para entrar.",
    invite: "Convidar",
    invited: "Convidado",
    toasts: {
      success: "Convite enviado com sucesso!",
      error: "Não foi possível convidar seu amigo!"
    }
  },
  NewInvites: {
    header_title: "Criar convites",
    title: "Gerar convite",
    subtitle: "Você pode gerar convites com essas configurações:",
    permanent: "Convite permanente",
    usage_unlimited: "Usos ilimitados",
    usage: "Usar no máximo {{count}} vez",
    usage_plural: "Usar no máximo {{count}} vezes",
    expire: "Expirar em {{count}} dia",
    expire_plural: "Expirar em {{count}} dias",
    day: "Dia",
    day_plural: "Dias",
    active_invites: "Convites ativos",
    generate: "Gerar",
    expire_in: "Expirar em ",
    usage_amount: "Foi usado {{count}} vez de ",
    usage_amount_plural: "Foi usado {{count}} vezes de ",
  },
  EditGroup: {
    toasts: {
      success: "Grupo editado com sucesso!",
      avatar_permission: "Precisamos da permissão para acessar suas fotos!",
      updating: "Atualizando avatar...",
      updated: "Avatar atualizado"
    },
    header_title: "Editar grupo",
    switch_avatar: "Trocar avatar",
    inputs: {
      name: "Nome",
      desc: "Descrição",
      public: "Tornar público"
    },
    done: "Concluir"
  },
  GroupInfos: {
    join: "Participar",
    joined: "Participando",
    participants: "Participante",
    participants_plural: "Participantes",
    tags: "Tags do grupo",
    desc: "Descrição",
    toasts: {
      error: "Não foi possível entrar no grupo!"
    }
  }
};
