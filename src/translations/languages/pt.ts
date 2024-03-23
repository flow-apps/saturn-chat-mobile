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
      subtitle: "Você está em {{count}} grupos",
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
    participants: "participantes",
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
      error_pass: "Erro ao alterar senha!"
    },
    labels: {
      current_password: "Senha atual",
      new_password: {
        label: "Nova senha",
        error: "A senha não segue os padrões segurança",
        info: "Sua senha deve conter: no mínimo 8 caracteres (sendo ao menos 1 letra maiúsculo), pelo menos 1 número e pelo menos 1 símbolo"
      },
      confirm_pass: {
        label: "Confirme a nova senha",
        error: "As senhas não combinam"
      }
    },
    done: "Alterar senha"
  }
};
