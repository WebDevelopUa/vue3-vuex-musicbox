<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50">

    <div>
      <!-- Dynamic routing to Song item -->
      <router-link
        :to="{name: 'song', params: {id: songProp.docID}}"
        class="font-bold block text-gray-600">
        {{ songProp.modifiedName }}
      </router-link>
      <span class="text-gray-500 text-sm">
        {{ songProp.displayName }}
      </span>
    </div>

    <div class="text-gray-600 text-lg">
      <!-- Dynamic routing to Song item #comments-->
      <router-link
        :to="{name: 'song', params: {id: songProp.docID}, hash: '#comments'}"
        v-slot="{navigate}"
        custom>
            <span @click="navigate"
                  class="comments">
              <i class="fa fa-comments text-gray-600"></i>
                    {{ songProp.commentCount }}
            </span>
      </router-link>
    </div>

  </li>
</template>

<script>
export default {
  name: 'SongItem',
  props: ['songProp'],
};
</script>
