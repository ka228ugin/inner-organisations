import { Component } from '@angular/core';

@Component({
  selector: 'no-content',
  template: `
    <div class="text-container">
      <h1>404: Страница не найдена</h1>
        <p>Вероятнее всего, вы попали сюда случайно.</p>
        <p>Однако, если вы считаете, что произошла ошибка,
            пожалуйста, сообщите об этом инженерам отдела АСУ центра безопасности.</p>
    </div>
  `
})
export class NoContentComponent {

}
