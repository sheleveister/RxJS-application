const getUserById = (id) => {
  const params = {
    access_token: '',
    user_ids: id,
    fields: 'photo_big',
  };

  return $.ajax({
    url: 'https://api.vk.com/method/users.get?' + $.param(params),
    type: 'GET',
    dataType: 'JSONP'
  }).promise();
};

Rx.Observable.fromEvent(document.querySelector('input'), 'keyup')
  .pluck('target', 'value')
  .distinct()
  .debounceTime(2000)
  .mergeMap(value => Rx.Observable.fromPromise(getUserById(value)))
  .catch(error => Rx.Observable.of(error))
  .map(item => item.response[0])
  .subscribe(
    (user) => {
      $('h1').html(`${user.first_name} ${user.last_name} - id: ${user.uid}`);
      $('img').attr('src', user.photo_big);
    },
    error => console.error(error),
    () => console.log('Completed')
  );
