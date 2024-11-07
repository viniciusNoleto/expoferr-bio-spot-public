
export class Formatter {

  static date(value: string) {
    return new Date(value).toLocaleDateString('pt-BR', { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: 'numeric' });
  };

}
