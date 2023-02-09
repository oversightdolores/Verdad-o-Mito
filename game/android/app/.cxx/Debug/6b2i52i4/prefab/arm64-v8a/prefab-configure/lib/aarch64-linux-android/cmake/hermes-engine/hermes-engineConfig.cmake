if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/home/nicolas/.gradle/caches/transforms-3/15cb33afcfddaa1c37181f3bd274f9f7/transformed/jetified-hermes-android-0.71.2-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/nicolas/.gradle/caches/transforms-3/15cb33afcfddaa1c37181f3bd274f9f7/transformed/jetified-hermes-android-0.71.2-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

