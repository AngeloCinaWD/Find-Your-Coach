export default {
  async registerCoach(context, formData) {
    // const coachData = {
    //   // id: 'c3',
    //   id: context.rootGetters.userId,
    //   firstName: formData.first,
    //   lastName: formData.last,
    //   description: formData.desc,
    //   hourlyRate: formData.rate,
    //   areas: formData.areas
    // };

    const userId = context.rootGetters.userId; // lo userId dovrà essere creato prima di inviare una request, ogni utente avrà un suo spazio con le sue cose, ci dovrà essere una sola voce coach per ogni userId

    const coachData = {
      firstName: formData.first,
      lastName: formData.last,
      description: formData.desc,
      hourlyRate: formData.rate,
      areas: formData.areas
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://findcoach-48b57-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,
      {
        // richiesta PUT, se i dati esistono li modifica, se non esistono li crea, POST invece aggiunge sempre una nuova voce
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    );

    // const responseData = await response.json(); // non sto utilizzando i dati di risposta

    if (!response.ok) {
      // error
    }

    // context.commit('registerCoach', coachData);

    context.commit('registerCoach', {
      ...coachData,
      id: userId
    });
  },
  async loadCoaches(context, payload) {
    // console.log(payload.forceRefresh, context.getters.shouldUpdate);
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      // se è falso, quindi non è > 60 secondi dall'ultimo fetch e non devi forzare il refresh, non fare nulla, non richiamare i dati
      return;
    }
    // console.log('ricaricato');
    const response = await fetch(
      `https://findcoach-48b57-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
    );

    const responseData = await response.json(); // sarà un grosso oggetto contenente delle chiavi (che sono gli id dei coach) con valore un oggetto (le info di ogni coach)

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };

      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  }
};
